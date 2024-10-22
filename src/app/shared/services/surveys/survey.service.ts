import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { SurveyModel } from '../../models/surveys/survey.mode';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private apiService: APIService) {}

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<SurveyModel>>(
      `${EndPointConstants.Survey.Index}/search`,
      data
    );
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<SurveyModel>>(
      `${EndPointConstants.Survey.Index}/${id}`
    );
  }

  save(obj: SurveyModel) {
    return this.apiService.postData<BaseResponse<SurveyModel>>(
      `${EndPointConstants.Survey.Index}`,
      obj
    );
  }

  update(id: string, obj: SurveyModel) {
    return this.apiService.putData<BaseResponse<SurveyModel>>(
      `${EndPointConstants.Survey.Index}/${id}`,
      obj
    );
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(
      `${EndPointConstants.Survey.Index}/${id}`
    );
  }

  saveSurveyResult(id: string, data: any) {
    return this.apiService.postData<BaseResponse<boolean>>(
      `${EndPointConstants.Survey.Index}/${id}/survey-result`,
      data
    );
  }
}
