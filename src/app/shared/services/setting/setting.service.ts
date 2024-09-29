import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { SettingModel } from 'src/app/shared/models/settings/setting.model';
import { APIService } from '../api.service';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private apiService: APIService) { }

  getAll() {
    return this.apiService.getData<BaseResponse<Array<SettingModel>>>(`${EndPointConstants.Setting.Index}/all`);
  }

  getSettingByType(type: string) {
    return this.apiService.getData<BaseResponse<Array<SettingModel>>>(`${EndPointConstants.Setting.Index}/types/${type}`);
  }

  getSettingByKey(key: string) {
    return this.apiService.getData<BaseResponse<SettingModel>>(`${EndPointConstants.Setting.Index}/keys/${key}`);
  }

  updateSettings(data: any) {
    return this.apiService.putData<BaseResponse<boolean>>(`${EndPointConstants.Setting.Index}/update`, data);
  }
}
