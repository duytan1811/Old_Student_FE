export class BaseResponse<T>{
  type: string;
  message: string;
  data: T;

  constructor() {
    this.type = 'success';
    this.message = '';
  }
}