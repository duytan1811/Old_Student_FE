export class BaseTableResponse<T>{
  type: string;
  key: string;
  items: Array<T>;
  total: number;

  constructor() {
    this.type = 'success';
    this.key = '';
    this.total = 0;
  }
}