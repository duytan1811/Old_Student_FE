import { BaseModel } from '../base/base.model';

export class StudentModel extends BaseModel {
  userId: string = '';
  majorId?: string = '';
  majorName?: string = '';
  fullName = '';
  birthday?: Date = new Date();
  gender?: number;
  avatar?: string = '';
  email?: string = '';
  phone?: string = '';
  schoolYear?: number;
  yearOfGraduation?: number;
  currentCompany?: string = '';
  jobTitle?: string = '';
  countArchievement: number = 0;
  countContribute: number = 0;
  contributes: Array<StudentContributeModel> = [];
}

export class StudentContributeModel {
  type: string = '';
  typeName: string = '';
  amount: number = 0;
  detail: string = '';
}
