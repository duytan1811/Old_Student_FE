import { BaseModel } from "../base/base.model";

export class SettingModel extends BaseModel {
  key: string;
  value: string;
  type: string;

  constructor() {
    super();
    this.key = '';
    this.value = '';
    this.type = '';
  }
}