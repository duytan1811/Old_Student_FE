import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { QuestionModel } from '../../models/questions/question.model';

@Injectable({
  providedIn: 'root',
})

export class QuestionService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<QuestionModel>>(`${EndPointConstants.Question.Index}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<QuestionModel>>(`${EndPointConstants.Question.Index}/${id}`);
  }

  save(obj: QuestionModel) {
    return this.apiService.postData<BaseResponse<QuestionModel>>(`${EndPointConstants.Question.Index}`, obj);
  }

  update(id: string, obj: QuestionModel) {
    return this.apiService.putData<BaseResponse<QuestionModel>>(`${EndPointConstants.Question.Index}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.Question.Index}/${id}`);
  }
}
