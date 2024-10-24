import { BaseModel } from '../base/base.model';

export class ContributeModel extends BaseModel {
  studentId: string = '';
  fullName: string = '';
  type: number | null;
  typeName: string = '';
  amount: number | null;
  detail: string = '';
}
