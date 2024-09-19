import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SettingConstants } from 'src/app/shared/constants/setting-constants';
import { DistrictModel } from 'src/app/shared/models/districts/district.model';
import { ProvinceModel } from 'src/app/shared/models/province/province.model';
import { SettingModel } from 'src/app/shared/models/settings/setting.model';
import { VillageModel } from 'src/app/shared/models/villages/village.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-setting-general',
  templateUrl: './setting-general.component.html',
  styleUrls: ['./setting-general.component.scss'],
})
export class SettingGeneralComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  formGroup: FormGroup;
  settingType = SettingConstants.TYPES[0];
  settings$: Observable<Array<SettingModel>>;
  sub: Subscription = new Subscription();
  provinces$: Observable<Array<ProvinceModel>>;
  districts$: Observable<Array<DistrictModel>>;
  villages$: Observable<Array<VillageModel>>;

  constructor(
    private fb: FormBuilder,
    private settingState: state.SettingState,
    private flashMessageState: state.FlashMessageState,
    private provinceState: state.ProvinceState,
    private districtState: state.DistrictState,
    private villageState: state.VillageState
  ) { }

  ngOnInit(): void {
    this.settingState.getSettingByType(this.settingType.key);
    this.isLoading$ = this.settingState.isLoading$;
    this.settings$ = this.settingState.settings$;
    this.initFormGroup();

    this.provinces$ = this.provinceState.provinces$;
    this.districts$ = this.districtState.districts$;
    this.villages$ = this.villageState.villages$;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public async onSave() {
    const objData = this.formGroup.getRawValue();
    let data: any = [];
    Object.keys(objData).forEach((key) => {
      data.push({
        key: key,
        type: this.settingType.key,
        value: objData[key],
      });
    });

    const result = await this.settingState.updateSettings(data);
    this.flashMessageState.message(result.type, CommonConstants.MENU_KEYS.SettingGeneral, result.message);
  }

  public getTempCodeOrder(startWith: string, endWith: string) {
    return `${startWith}1000000000${endWith}`;
  }

  public onChangeProvince(event: MatSelectChange) {
    this.districtState.getDistrictsByProvinceCode(event.value);
  }

  public onChangeDistrict(event: MatSelectChange) {
    this.villageState.getVillagesByDistrictCode(event.value);
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      webName: [''],
      email: [''],
      emailSupportCustomer: [''],
      phone: [''],
      address: [''],
      province: [''],
      district: [''],
      village: [''],
      timezone: [''],
      currency: [''],
      orderCodeStartWith: [''],
      orderCodeEndWith: [''],
    });

    this.fillDataFormGroup();
  }

  private fillDataFormGroup() {
    this.sub = this.settings$.subscribe((settings) => {
      if (settings) {
        let startWith = '';
        let endWith = '';
        settings.forEach((setting) => {
          this.formGroup.get(setting.key)?.setValue(setting.value);
          if (setting.key === 'orderCodeStartWith') {
            startWith = setting.value;
          }

          if (setting.key === 'orderCodeEndWith') {
            endWith = setting.value;
          }
        });
        this.getTempCodeOrder(startWith, endWith);
      }
    });
  }
}
