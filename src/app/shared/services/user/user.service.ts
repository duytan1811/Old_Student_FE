import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { APIService } from '../api.service';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService :APIService) { }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<UserModel>>(`${EndPointConstants.User}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<UserModel>>(`${EndPointConstants.User}/${id}`);
  }

  save(obj: UserModel) {
    return this.apiService.postData<BaseResponse<UserModel>>(`${EndPointConstants.User}`, obj);
  }

  update(id: string, obj: UserModel) {
    return this.apiService.putData<BaseResponse<UserModel>>(`${EndPointConstants.User}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.User}/${id}`);
  }
}
