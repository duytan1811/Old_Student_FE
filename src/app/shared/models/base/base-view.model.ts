import { Paginator } from "../base/paginator.model";
import { Sorting } from "../base/sorting.model";

export class BaseViewModel {
  paginator: Paginator;
  sorting: Sorting;
  searchParams: any;

  constructor() {
    this.paginator = new Paginator();
    this.sorting = new Sorting();
    this.searchParams = {};
  }
}



