import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { BlogDetailDialogComponent } from 'src/app/shared/components/blog-detail-dialog/blog-detail-dialog.component';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { ForumModel } from 'src/app/shared/models/forum/forum.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: [],
})
export class ForumComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  public ckEditor = ClassicEditorBuild;
  public currentUser$: Observable<UserModel>;
  public news$: Observable<Array<ForumModel>>;
  public userView$: Observable<BaseViewModel>;

  constructor(
    private dialog: MatDialog,
    private authState: state.AuthState,
    private forumState: state.ForumState,
    private newState: state.NewsState,
    private viewState: state.ViewState
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authState.currentUser$;
    this.news$ = this.forumState.news$;
    this.onSearch();
  }

  public onSearch(){
    const viewState = this.viewState.getViewState();
    this.forumState.search(viewState);
    this.userView$ = this.viewState.view$;
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.forumState.search(viewState);
  }

  public async onLike(id: string) {
    const res = await this.newState.like(id);

    if (res.type === CommonConstants.ResponseType.Success) {
      this.onSearch();
    }
  }

  public onOpenNewsDetail(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = {
    };
    const dialogRef = this.dialog.open(BlogDetailDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
