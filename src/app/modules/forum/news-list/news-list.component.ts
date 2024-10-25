import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Observable, Subscription } from 'rxjs';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { ForumModel } from 'src/app/shared/models/forum/forum.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
import { BlogDetailDialogComponent } from 'src/app/shared/components/blog-detail-dialog/blog-detail-dialog.component';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { EditNewsDialogComponent } from '../components/edit-news-dialog/edit-news-dialog.component';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: [],
})
export class NewsListComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  public ckEditor = ClassicEditorBuild;
  public currentUser$: Observable<UserModel>;
  public news$: Observable<Array<ForumModel>>;
  public userView$: Observable<BaseViewModel>;
  public totalNews$: Observable<number>;
  public status = StatusEnum;
  public dropdownNewTypes$: Observable<Array<SelectListItem>>;
  public formSearch: FormGroup;

  constructor(
    private dialog: MatDialog,
    private authState: state.AuthState,
    private forumState: state.ForumState,
    private newState: state.NewsState,
    private viewState: state.ViewState,
    private dropdownState: state.DropdownState,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authState.currentUser$;
    this.news$ = this.forumState.news$;
    this.totalNews$ = this.forumState.totalNews$;
    this.dropdownNewTypes$ = this.dropdownState.dropdownNewsTypes$;
    this.dropdownState.getDropdownNewTypes();
    this.initFormGroup();
    this.onSearch();
  }

  public onSearch() {
    let viewState = this.viewState.getViewState();
    this.forumState.search(viewState);
    const data = this.formSearch.getRawValue();
    data.type = data.type !== '' ? parseInt(data.type) : null;
    viewState.searchParams = data;
    this.userView$ = this.viewState.view$;
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    const data = this.formSearch.getRawValue();
    data.type = data.type !== '' ? parseInt(data.type) : null;
    viewState.paginator = paginator;
    viewState.searchParams = data;
    this.viewState.setViewState(viewState);
    this.forumState.search(viewState);
  }

  public onSeachByType(event: any) {
    const viewState = this.viewState.getViewState();
    const data = this.formSearch.getRawValue();
    data.type = event.target?.value !== '' ? parseInt(event.target?.value) : null;
    viewState.searchParams = data;
    this.viewState.setViewState(viewState);
    this.forumState.search(viewState);
  }

  public async onLike(id: string) {
    const res = await this.newState.like(id);

    if (res.type === CommonConstants.ResponseType.Success) {
      this.onSearch();
    }
  }

  public onOpenNewsDetail(newsId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = { newsId };
    const dialogRef = this.dialog.open(BlogDetailDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.onSearch();
    });
  }

  public onCreateNews() {
    this.onEditNews();
  }

  public onEditNews(newsId: string | null = null): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { newsId };
    const dialogRef = this.dialog.open(EditNewsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.onSearch();
    });
  }

  private initFormGroup() {
    this.formSearch = this.fb.group({
      type: [''],
    });
  }
}
