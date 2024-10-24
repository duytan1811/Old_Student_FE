import { BaseModel } from '../base/base.model';

export class SurveyResultDetailModel extends BaseModel {
  createdByName: string = '';
  items: Array<SurveyResultDetailItemModel> = [];
}

export class SurveyResultDetailItemModel {
  surveyId: string = '';
  questionId: string = '';
  questionName: string = '';
  point: number = 0;
  comment: string = '';
  isQuestionComment: boolean = false;
}
