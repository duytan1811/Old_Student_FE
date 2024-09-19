export class BaseModel {
  isAdmin?: boolean;
  id: string;
  status?: number;
  statusName?: string = '';
  createdAt: Date;
  updatedAt: Date;
}
