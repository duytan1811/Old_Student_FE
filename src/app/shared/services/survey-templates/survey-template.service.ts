import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { SurveyTemplateModel } from '../../models/survey-templates/survey-template.mode';

@Injectable({
  providedIn: 'root',
})

export class SurveyTemplateService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<SurveyTemplateModel>>(`${EndPointConstants.SurveyTemplate.Index}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<SurveyTemplateModel>>(`${EndPointConstants.SurveyTemplate.Index}/${id}`);
  }

  save(obj: SurveyTemplateModel) {
    return this.apiService.postData<BaseResponse<SurveyTemplateModel>>(`${EndPointConstants.SurveyTemplate.Index}`, obj);
  }

  update(id: string, obj: SurveyTemplateModel) {
    return this.apiService.putData<BaseResponse<SurveyTemplateModel>>(`${EndPointConstants.SurveyTemplate.Index}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.SurveyTemplate.Index}/${id}`);
  }
}
