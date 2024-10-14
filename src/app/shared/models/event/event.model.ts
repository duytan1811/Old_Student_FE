import { BaseModel } from "../base/base.model";

export class EventModel extends BaseModel {
  title: string = '';
  startDate: Date = new Date();
  startDateFormat: string = '';
  endDate: Date = new Date();
  endDateFormat: string = '';
  address: string = '';
  content: string = '';
  type: number | null = null;
  typeName: string = '';
  isRegister: boolean = false;
  countEventRegister: number = 0;
  isExpired: boolean = false;
  isComming: boolean = false;
  isProgress: boolean = false;
}