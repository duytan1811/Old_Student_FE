import { BaseModel } from '../base/base.model';

export class NewsModel extends BaseModel {
  name: string = '';
  description: string = '';
  type: number | null = null;
  typeName: string = '';
  content: string = '';
  startDate: Date;
  endDate: Date;
  countMember: number = 0;
}
