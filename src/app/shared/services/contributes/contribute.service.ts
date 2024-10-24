import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { ContributeModel } from '../../models/contributes/contribute.model';

@Injectable({
  providedIn: 'root',
})

export class ContributeService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<ContributeModel>>(`${EndPointConstants.Contribute.Index}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<ContributeModel>>(`${EndPointConstants.Contribute.Index}/${id}`);
  }

  save(obj: ContributeModel) {
    return this.apiService.postData<BaseResponse<ContributeModel>>(`${EndPointConstants.Contribute.Index}`, obj);
  }

  update(id: string, obj: ContributeModel) {
    return this.apiService.putData<BaseResponse<ContributeModel>>(`${EndPointConstants.Contribute.Index}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.Contribute.Index}/${id}`);
  }
}
