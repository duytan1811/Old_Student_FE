import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-setting-role-edit-dialog',
  templateUrl: './setting-role-edit-dialog.component.html',
  styleUrls: [],
})
export class SettingRoleEditDialogComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public role$: Observable<RoleModel>;
  public isCreate: boolean;
  public id: string;
  public formGroup: FormGroup;
  public statuses = CommonConstants.FormStatuses;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleState: state.RoleState,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private dialogRef: MatDialogRef<SettingRoleEditDialogComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.roleState.findById(this.id);
    this.role$ = this.roleState.role$;

    this.initFormGroup();
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
    if (res.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      status: [null],
    });
  }
}
