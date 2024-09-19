import { BaseModel } from "../base/base.model";

export class MajorModel extends BaseModel {
  orderId:string;
  name: string;
  areaId: string;
  areaName: string;
  isProgress:boolean;
}