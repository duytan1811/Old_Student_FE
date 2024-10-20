import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { UserService } from 'src/app/shared/services';
import { AuthState, FlashMessageState } from 'src/app/shared/state';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: []
})
export class ChangePasswordComponent implements OnInit {
  public formGroup: FormGroup;
  public user$: Observable<UserModel>;
  private userId: string;

  constructor(
    private authState: AuthState,
    private flashState: FlashMessageState,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authState.currentUser$;
    this.user$.subscribe((res: any) => {
      if (res) {
        this.userId = res.id;
      }
    })
    this.initFormGroup();
  }

  public onSave() {
    const data = this.formGroup.getRawValue();
    if (data.newPassword != data.confirmPassword) {
      this.flashState.message('error', 'Xác nhận mật khẩu không trùng khớp');
      return;
    }

    this.userService.changePassword(this.userId, data).subscribe({
      next: (res: BaseResponse<any>) => {
        if (res ) {
          this.flashState.message(res.type, res.message);
        }
      }
    })
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }
}
