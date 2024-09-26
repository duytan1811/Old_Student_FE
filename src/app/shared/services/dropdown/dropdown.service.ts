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

  getMajors() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(`${EndPointConstants.Dropdown.Index}/majors`);
  }

  getUsers() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(`${EndPointConstants.Dropdown.Index}/users`);
  }

}
