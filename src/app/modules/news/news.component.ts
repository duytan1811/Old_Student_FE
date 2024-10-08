import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { NewsModel } from 'src/app/shared/models/news/news.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: [],
})
export class NewsComponent implements OnInit {
  public newsList$: Observable<Array<NewsModel>>;
  public dropdownNewsTypes$: Observable<Array<SelectListItem>>;
  public isLoading$: Observable<boolean>;
  public totalNews$: Observable<number>;
  public userView$: Observable<BaseViewModel>;
  public formGroupSearch: FormGroup;
  public searchStatuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;

  constructor(
    private fb: FormBuilder,
    private viewState: state.ViewState,
    private newsState: state.NewsState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
    private title: Title,
    private pageInfo: PageInfoService,
    private dropdownState: state.DropdownState,
    private authState: state.AuthState,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Danh sách bài viết');
    this.title.setTitle('Danh sách bài viết');
    this.isLoading$ = this.newsState.isLoading$;
    this.newsList$ = this.newsState.newsList$;
    this.totalNews$ = this.newsState.totalNews$;
    this.userView$ = this.viewState.view$;

    this.dropdownNewsTypes$ = this.dropdownState.dropdownNewsTypes$;
    this.dropdownState.getDropdownNewTypes();
    this.initFormGroupSearch();

    this.onSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formGroupSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    dataSearch.type = dataSearch.type !== '' ? parseInt(dataSearch.type) : null;
    dataSearch.countLike =
      dataSearch.countLike !== '' ? parseInt(dataSearch.countLike) : null;

    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.newsState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.newsState.search(viewState);
  }

  public goCreate() {
    this.router.navigate([`/news/create`]);
  }

  public goEdit(id: string | null) {
    this.router.navigate([`/news/${id}`]);
  }

  public async onConfirmNews(newsId: string) {
    const res = await this.newsState.confirm(newsId);
    this.flashMessageState.message(res.type, res.message);
    this.onSearch();
  }

  public goDelete(data: NewsModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: data.id,
    };
    const dialogRef = this.dialog.open(
      ConfirmDeleteModalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const res = await this.newsState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
        const viewState = this.viewState.getViewState();
        this.newsState.search(viewState);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MenuKey.News,
      rule
    );
  }

  private initFormGroupSearch() {
    this.formGroupSearch = this.fb.group({
      content: [''],
      countLike: [''],
      type: [''],
      status: [''],
    });
  }
}
