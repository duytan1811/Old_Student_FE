import { BaseModel } from '../base/base.model';
import { QuestionModel } from '../questions/question.model';

export class SurveyModel extends BaseModel {
  name: string = '';
  type: number;
  questionIds: Array<string> = [];
  questions: Array<QuestionModel> = [];
  startDate: Date;
  startDateFormat: string = '';
  endDate: Date;
  endDateFormat: string = '';
  isExpried: boolean = false;
  isSurveyed: boolean = false;
  countSurveyed:number=0;
}
