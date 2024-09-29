import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: [],
})
export class UserEditModalComponent implements OnInit {
  public id: string;
  public isCreate: boolean;
  public user$: Observable<UserModel>;
  public isLoading$: Observable<boolean>;
  public dropdownRole$: Observable<Array<SelectListItem>>;
  public formGroup: FormGroup;
  public formStatuses = CommonConstants.FormStatuses;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userState: state.UserState,
    private flashMessageState: state.FlashMessageState,
    private dropdownState: state.DropdownState,
    public dialogRef: MatDialogRef<UserEditModalComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;

    this.isLoading$ = this.userState.isLoading$;
    this.userState.findById(this.id);
    this.user$ = this.userState.user$;

    this.initFormGroup();
    if (!this.isCreate) {
      this.formGroup.get('userName')?.disable();
      this.formGroup.get('password')?.disable();
    }
  }

  public onChangeDefaultPassword(event: MatCheckboxChange) {
    this.formGroup.get('isDefaultPassword')?.setValue(event.checked);
    if (event.checked) {
      this.formGroup.get('password')?.disable();
    } else {
      this.formGroup.get('password')?.enable();
    }
  }

  public isDefaultPassword() {
    return this.formGroup.get('isDefaultPassword')?.value;
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let res;
    if (!this.isCreate) {
      res = await this.userState.update(this.id, data);
    } else {
      res = await this.userState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (res.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/),
        ],
      ],
      status: [''],
      isDefaultPassword: [false],
    });
  }
}
