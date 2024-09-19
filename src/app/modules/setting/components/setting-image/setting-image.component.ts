import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SettingConstants } from 'src/app/shared/constants/setting-constants';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-setting-image',
  templateUrl: './setting-image.component.html',
  styleUrls: ['./setting-image.component.scss']
})
export class SettingImageComponent implements OnInit {

  formGroup: FormGroup;
  isLoading$: Observable<boolean>;
  settingType = SettingConstants.TYPES[3];
  selectedLoginAdminFile: File | undefined;
  selectedUserFile: File | undefined;
  loginAdminFileName: string;
  userFileName: string;

  constructor(
    private settingState: state.SettingState,
    private flashMessageState: state.FlashMessageState,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.settingState.isLoading$;

    this.formGroup = this.fb.group({
      user: [''],
      loginAdmin: ['']
    })
  }

  public async onSave() {
    const objData = this.formGroup.getRawValue();
    let data: any = [];
    Object.keys(objData).forEach(key => {
      data.push({
        key: key,
        type: this.settingType.key,
        value: objData[key],
      })
    });

    const result = await this.settingState.updateSettings(data);
    this.flashMessageState.message(result.type, CommonConstants.MENU_KEYS.DefaultImage, result.message);
  }

  public changeInputFile(key: string, event: any) {
    var file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (key === 'loginAdmin') {
        this.formGroup.get('loginAdmin')?.setValue(reader.result);
      }
      if (key === 'user') {
        this.formGroup.get('user')?.setValue(reader.result);
      }
    };
  }
}
