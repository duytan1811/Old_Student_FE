import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { MajorModel } from '../../models/major/major.model';

@Injectable({
  providedIn: 'root',
})

export class MajorService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<MajorModel>>(`${EndPointConstants.Major}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<MajorModel>>(`${EndPointConstants.Major}/${id}`);
  }

  save(obj: MajorModel) {
    return this.apiService.postData<BaseResponse<MajorModel>>(`${EndPointConstants.Major}`, obj);
  }

  update(id: string, obj: MajorModel) {
    return this.apiService.putData<BaseResponse<MajorModel>>(`${EndPointConstants.Major}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.Major}/${id}`);
  }

  exportTemplate() {
    return this.apiService.getData<BaseResponse<string>>(`${EndPointConstants.Major}/export-template`);
  }

  import(formData: FormData) {
    return this.apiService.postData<BaseResponse<boolean>>(`${EndPointConstants.Major}/import`, formData, { headers: { 'content-type': 'multipart/form-data' } });
  }
}
