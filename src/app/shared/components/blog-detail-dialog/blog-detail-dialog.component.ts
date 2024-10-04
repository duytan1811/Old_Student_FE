import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import * as state from 'src/app/shared/state';
import { NewsModel } from '../../models/news/news.model';
import { UserModel } from '../../models/users/user.model';
import { BaseViewModel } from '../../models/base/base-view.model';
import { Paginator } from '../../models/base/paginator.model';
import { CommonConstants } from '../../constants/common-constants';
import { CommentModel } from '../../models/news/comment.model';

@Component({
  selector: 'app-blog-detail-dialog',
  templateUrl: './blog-detail-dialog.component.html',
  styleUrls: [],
})
export class BlogDetailDialogComponent implements OnInit {
  @ViewChild('commentContent') commentContent: ElementRef;
  public newsId: string;
  public news$: Observable<NewsModel>;
  public currentUser$: Observable<UserModel>;
  public comments$: Observable<Array<CommentModel>>;
  public userView$: Observable<BaseViewModel>;
  public content: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BlogDetailDialogComponent>,
    private newsState: state.NewsState,
    private authState: state.AuthState,
    private viewState: state.ViewState,
  ) {}

  ngOnInit(): void {
    this.newsId = this.data.newsId;
    this.news$ = this.newsState.news$;

    this.currentUser$ = this.authState.currentUser$;
    this.comments$ = this.newsState.comments$;
    this.newsState.findById(this.newsId);
    this.getCommentList();
  }

  public onFocusComment() {
    this.commentContent.nativeElement.focus();
  }

  public onScroll(){
  }

  public getCommentList() {
    const viewState = this.viewState.getViewState();
    viewState.searchParams = { newsId: this.newsId };

    this.newsState.getCommentList(viewState);
    this.userView$ = this.viewState.view$;
  }

  public async onLike() {
    const res = await this.newsState.like(this.newsId);

    if (res.type === CommonConstants.ResponseType.Success) {
      this.newsState.findById(this.newsId);
    }
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.newsState.getCommentList(viewState);
  }

  public async onComment(id: string) {
    const data = {
      newsId: id,
      content: this.content,
    };
    if (this.content === '') return;
    const result = await this.newsState.comment(data);

    if (result.type === CommonConstants.ResponseType.Success) {
      this.content = '';
      this.getCommentList();
    }
  }
}
