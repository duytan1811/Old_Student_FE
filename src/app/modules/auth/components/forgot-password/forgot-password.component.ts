import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as state from 'src/app/shared/state';
import { first } from 'rxjs/operators';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public errorState: ErrorStates = ErrorStates.NotSubmitted;
  public errorStates = ErrorStates;
  public isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  constructor(private fb: FormBuilder, private authState: state.AuthState) {
    this.isLoading$ = this.authState.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  public submit() {
    this.errorState = ErrorStates.NotSubmitted;
    const forgotPasswordSubscr = this.authState
      .forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe((result: BaseResponse<boolean>) => {
        this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }

  private initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        'admin@demo.com',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }
}
