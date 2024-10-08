import { BaseModel } from '../base/base.model';

export class JobModel extends BaseModel {
  title: string = '';
  content: string = '';
  majorId: string = '';
  majorName: string = '';
  startDate: Date;
  startDateFormat: string = '';
  endDate: Date;
  endDateFormat: string = '';
  filePath: string = '';
  fileName: string = '';
  companyName: string = '';
  address: string = '';
  workType: string = '';
  workTypeName: string = '';
  skills: Array<string> = [];
  isApplyed: boolean = false;
  countApplyed: number = 0;
}
