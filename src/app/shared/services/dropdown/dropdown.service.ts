import { Injectable } from '@angular/core';
import { APIService } from '../api.service';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private apiService: APIService) {}

  getMajors() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.Major}`
    );
  }

  getUsers() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.User}`
    );
  }

  getRoles() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.Role}`
    );
  }

  getNewsTypes() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.NewsType}`
    );
  }

  getEventTypes() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.Events}`
    );
  }

  getQuestions() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.Questions}`
    );
  }

  getSurveyTypes() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.SurveyType}`
    );
  }

  getStudent() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.Student}`
    );
  }

  getContributeTypes() {
    return this.apiService.getData<BaseResponse<Array<SelectListItem>>>(
      `${EndPointConstants.Dropdown.Contribute}`
    );
  }
}
