import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as state from 'src/app/shared/state';
import { first } from 'rxjs/operators';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  constructor(private fb: FormBuilder, private authState: state.AuthState,
    private flashState: state.FlashMessageState
  ) {
    this.isLoading$ = this.authState.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  public submit() {
    if(this.forgotPasswordForm.invalid) {
      this.flashState.message('error', 'Nhập địa chỉ email');
      return
    };
    const forgotPasswordSubscr = this.authState
      .forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe((result: BaseResponse<boolean>) => {
        if (result) {
          this.flashState.message(result.type, result.message);
        }
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }

  private initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
    });
  }
}
