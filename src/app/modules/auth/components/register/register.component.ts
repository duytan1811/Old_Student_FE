import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authState: state.AuthState,
    private flashMessageState: state.FlashMessageState
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  public async onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const data = this.formGroup.getRawValue();
    const result = await this.authState.register(data);
    this.flashMessageState.message(result.type, result.message);
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isAgree: ['', Validators.required],
    });
  }
}
