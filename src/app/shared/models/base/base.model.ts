import { StatusEnum } from "../../enum/status.enum";

export class BaseModel {
  index: number;
  isAdmin: boolean;
  id: string;
  status?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.index = 0;
    this.id = '';
    this.isAdmin = false;
    this.status = StatusEnum.Active;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}