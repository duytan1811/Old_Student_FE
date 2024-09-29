import { BaseModel } from '../base/base.model';

export class NewsModel extends BaseModel {
  index: number = 0;
  name: string = '';
  description: string = '';
  type: number | null = null;
  typeName: string = '';
  content: string = '';
  startDate: Date;
  startDateFormat: string;
  endDate: Date;
  endDateFormat: string;
  countMember: number = 0;
}
