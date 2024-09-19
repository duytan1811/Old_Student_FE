export const PageSizes = [3, 5, 10, 15, 50, 100];
export class Paginator {
  page: number;
  pageSize: number;
  total: number

  constructor() {
    this.page = 0;
    this.pageSize = 10;
    this.total = 0;
  }
}