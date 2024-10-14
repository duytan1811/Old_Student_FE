import { BaseModel } from '../base/base.model';

export class EventRegisterModel extends BaseModel {
  index: number = 0;
  phoneNumber: string = '';
  email: string = '';
  fullName: string = '';
}
