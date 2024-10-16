import { BaseModel } from '../base/base.model';

export class JobModel extends BaseModel {
  title: string = '';
  content: string = '';
  majorId: string = '';
  majorName: string = '';
  startDate: Date = new Date();
  startDateFormat: string = '';
  endDate: Date = new Date();
  endDateFormat: string = '';
  filePath: string = '';
  fileName: string = '';
  fileBase64: string = '';
  companyName: string = '';
  address: string = '';
  workType: string = '';
  workTypeName: string = '';
  skills: Array<string> = [];
  isApplyed: boolean = false;
  countApplyed: number = 0;
  isExpired:boolean =false;
}
