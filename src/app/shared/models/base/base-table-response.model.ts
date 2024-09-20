export class BaseTableResponse<T>{
  type: string;
  message: string;
  items: Array<T>;
  total: number;

  constructor() {
    this.type = 'success';
    this.message = '';
    this.total = 0;
  }
}