import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import { Observable, Subscription } from 'rxjs';
import * as state from 'src/app/shared/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';
import { PermissionModel } from 'src/app/shared/models/base/permission.model';

@Component({
  selector: 'app-role-edit-modal',
  templateUrl: './role-edit-modal.component.html',
  styleUrls: [],
})
export class RoleEditModalComponent implements OnInit, OnDestroy {
  @Output() emitService = new EventEmitter();
  public formGroup: FormGroup;
  public role$: Observable<RoleModel>;
  public isLoading$: Observable<boolean>;
  public id: string;
  public isCreate: boolean;
  public permissionMenus$: Observable<Array<MenuModel>>;
  public claimValue = ClaimValue;

  private subs: Array<Subscription> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roleState: state.RoleState,
    private flashMessageState: state.FlashMessageState,
    public dialogRef: MatDialogRef<RoleEditModalComponent>,
    private menuState: state.MenuState
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.roleState.findById(this.id);
    this.role$ = this.roleState.role$;
    this.isLoading$ = this.roleState.isLoading$;
    this.permissionMenus$ = this.menuState.featureMenus$;
    this.initFormGroup();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public isCheckedPermission(
    menuPermissions: Array<PermissionModel>,
    menuKey: string,
    claimValue: string
  ) {
    const menuPermission = menuPermissions.find((x) => x.claimType == menuKey);
    if (menuPermission && claimValue === ClaimValue.View) {
      return menuPermission.isView;
    } else if (menuPermission && claimValue === ClaimValue.Create) {
      return menuPermission.isCreate;
    } else if (menuPermission && claimValue === ClaimValue.Edit) {
      return menuPermission.isEdit;
    } else if (menuPermission && claimValue === ClaimValue.Delete) {
      return menuPermission.isDelete;
    }
    return false;
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let dataMenuPermission: Array<MenuModel> = [];
    this.permissionMenus$.subscribe((res) => {
      dataMenuPermission = res;
    });
    let dataSavePermission: Array<any> = [];
    dataMenuPermission.forEach((menuPermission) => {
      if (menuPermission.items && menuPermission.items.length > 0) {
        menuPermission.items.forEach((subMenu) => {
          this.addSaveMenuPermission(dataSavePermission, subMenu);
        });
      } else {
        this.addSaveMenuPermission(dataSavePermission, menuPermission);
      }
    });
    data.menuPermissions = dataSavePermission;
    let res;
    if (!this.isCreate) {
      res = await this.roleState.update(this.id, data);
    } else {
      res = await this.roleState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (res.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }

  private addSaveMenuPermission(result: Array<any>, menuPermission: MenuModel) {
    if (menuPermission.permission.isView) {
      result.push({
        claimType: menuPermission.key,
        claimValue: ClaimValue.View,
      });
    }
    if (menuPermission.permission.isCreate) {
      result.push({
        claimType: menuPermission.key,
        claimValue: ClaimValue.Create,
      });
    }
    if (menuPermission.permission.isEdit) {
      result.push({
        claimType: menuPermission.key,
        claimValue: ClaimValue.Edit,
      });
    }
    if (menuPermission.permission.isDelete) {
      result.push({
        claimType: menuPermission.key,
        claimValue: ClaimValue.Delete,
      });
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
}
