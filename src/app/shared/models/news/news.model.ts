import { BaseModel } from '../base/base.model';

export class NewsModel extends BaseModel {
  index: number = 0;
  type: number | null = null;
  typeName: string = '';
  content: string = '';
  startDate: Date;
  startDateFormat: string;
  endDate: Date;
  endDateFormat: string;
  countMember: number = 0;
  countLike: number = 0;
  countComment: number = 0;
  createdByName: string = '';
  createdByAvater: string = '';
  isLiked:boolean = false;
}
