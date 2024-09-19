import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paginator } from 'src/app/shared/models/base/paginator.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: Paginator | undefined;
  @Input() showFirstPage: boolean = false;
  @Input() showLastPage: boolean = false;
  pageSizes = [5, 10, 20, 50];
  @Output() paginate: EventEmitter<Paginator> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  pageSizeChange() {
    if (this.paginator !== undefined) {
      this.paginator.page = 1;
      this.paginator.pageSize = parseInt(this.paginator.pageSize.toString());
      this.paginate.emit(this.paginator);
    }
  }

  pageChange(num: number) {
    if (this.paginator !== undefined) {
      this.paginator.page = num;
      this.paginate.emit(this.paginator);
    }
  }
}
