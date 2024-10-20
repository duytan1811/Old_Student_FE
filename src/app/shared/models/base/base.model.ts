import { StatusEnum } from "../../enum/status.enum";

export class BaseModel {
  index: number = 0;
  isAdmin?: boolean;
  id: string;
  status?: number =StatusEnum.Active;
  statusName?: string = '';
  createdAt: Date;
  updatedAt: Date;
}
