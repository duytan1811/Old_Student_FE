import { Injectable } from '@angular/core';
import { APIService } from '../api.service';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';

@Injectable({
  providedIn: 'root',
})

export class DropdownService {

  constructor(private apiService: APIService) {
  }

  getProductMenuTypes() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(`${EndPointConstants.Dropdown}/product-menu-types`);
  }

  getSuppliers() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(`${EndPointConstants.Dropdown}/suppliers`);
  }

  getUsers() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(`${EndPointConstants.Dropdown}/users`);
  }

  getAreas() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(`${EndPointConstants.Dropdown}/areas`);
  }
  getProductGroups() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(`${EndPointConstants.Dropdown}/product-groups`);
  }
}
