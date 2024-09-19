import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { APIService } from '../api.service';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<RoleModel>>(`${EndPointConstants.Role}/search`, data);
  }

  searchUsersByRoleId(data: any) {
    return this.apiService.postData<BaseTableResponse<UserModel>>(`${EndPointConstants.Role}/${data.searchParams.roleId}/users`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<RoleModel>>(`${EndPointConstants.Role}/${id}`);
  }

  save(obj: RoleModel) {
    return this.apiService.postData<BaseResponse<RoleModel>>(`${EndPointConstants.Role}`, obj);
  }

  update(id: string, obj: RoleModel) {
    return this.apiService.putData<BaseResponse<RoleModel>>(`${EndPointConstants.Role}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.Role}/${id}`);
  }

  saveUserByRole(id: string, userIds: Array<string>) {
    return this.apiService.putData<BaseResponse<boolean>>(`${EndPointConstants.Role}/${id}/users`, { userIds });
  }

  deleteUserByRole(id: string, userIds: Array<string>) {
    return this.apiService.deleteWithBodyData<BaseResponse<boolean>>(`${EndPointConstants.Role}/${id}/users`, { userIds });
  }
}
