import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import { Observable, Subscription } from 'rxjs';
import * as state from 'src/app/shared/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-role-edit-modal',
  templateUrl: './role-edit-modal.component.html',
  styleUrls: []
})
export class RoleEditModalComponent implements OnInit, OnDestroy {

  @Output() emitService = new EventEmitter();
  public formGroup: FormGroup;
  public role$: Observable<RoleModel>;
  public isLoading$: Observable<boolean>;
  public id: string;
  public isCreate: boolean;
  public permissionMenus$: Observable<Array<MenuModel>>;
  private subs: Array<Subscription> = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roleState: state.RoleState,
    private flashMessageState: state.FlashMessageState,
    public dialogRef: MatDialogRef<RoleEditModalComponent>,
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.roleState.findById(this.id);
    this.role$ = this.roleState.role$;
    this.isLoading$ = this.roleState.isLoading$;

    this.initFormGroup();

    this.role$.subscribe(role => {
      if (role && role.permissionMenus) {
        this.initPermissionMenus(role);
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let res;
    if (!this.isCreate) {
      res = await this.roleState.update(this.id, data);
    } else {
      res = await this.roleState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (res.type === CommonConstants.RESPONSE_TYPES.SUCCESS) {
      this.dialogRef.close();
    }
  }

  public getSubPermissionMenus(index: number) {
    return this.formGroup.get(`permissionMenus.${index}.menuItems`) as FormArray;
  }

  public onChangeMenuExpand(control: any) {
    const expand = control.get('expand')?.value;
    control.get('expand').setValue(!expand);
  }

  public get permissionMenus() {
    return this.formGroup.get('permissionMenus') as FormArray;
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      permissionMenus: this.fb.array([]),
    })
  }

  private initPermissionMenus(role: RoleModel) {
    this.initFormGroup();
    role.permissionMenus.forEach((pm) => {
      this.permissionMenus.push(
        this.fb.group({
          expand: [false],
          display: [pm.display],
          permission: new FormGroup({
          }),
        })
      );
    })
  }

  private initSubPermissionMenus(menuItems: Array<MenuModel>) {
    let subPermissionMenus = new FormArray([]);
    menuItems.forEach(menu => {
      subPermissionMenus.push(
        this.fb.group({
          display: [menu.display],
          permission: new FormGroup({

          }),
        })
      );
    })
    return subPermissionMenus;
  }
}
