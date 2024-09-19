import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { ToastrService } from 'ngx-toastr';
import * as state from 'src/app/shared/state';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public defaultAuth: any = {
    userName: 'admin',
    password: '123',
  };
  public loginForm: FormGroup;
  public returnUrl: string;
  public isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = []; 

  constructor(
    private fb: FormBuilder,
    private authState: state.AuthState,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.isLoading$ = this.authState.isLoading$;
    // redirect to home if already logged in
    if (this.authState.getCurrentUser()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }
  
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public get f() {
    return this.loginForm.controls;
  }

  public submit() {
    const loginSubscr = this.authState
      .login(this.f.userName.value, this.f.password.value)
      .pipe(first())
      .subscribe((res: BaseResponse<UserModel>) => {
        if (res && res.type === CommonConstants.RESPONSE_TYPES.SUCCESS) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.toastrService.error(res.message);
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userName: [
        this.defaultAuth.userName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
}
