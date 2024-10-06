export class BaseModel {
  index: number = 0;
  isAdmin?: boolean;
  id: string;
  status?: number;
  statusName?: string = '';
  createdAt: Date;
  updatedAt: Date;
}
