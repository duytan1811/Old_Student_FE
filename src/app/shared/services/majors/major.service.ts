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
    return this.apiService.postData<BaseTableResponse<MajorModel>>(`${EndPointConstants.Major.Index}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<MajorModel>>(`${EndPointConstants.Major.Index}/${id}`);
  }

  save(obj: MajorModel) {
    return this.apiService.postData<BaseResponse<MajorModel>>(`${EndPointConstants.Major.Index}`, obj);
  }

  update(id: string, obj: MajorModel) {
    return this.apiService.putData<BaseResponse<MajorModel>>(`${EndPointConstants.Major.Index}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.Major.Index}/${id}`);
  }
}
