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
import { NewsService } from '../../services/news/news.service';
import { BaseTableResponse } from '../../models/base/base-table-response.model';

@Component({
  selector: 'app-blog-detail-dialog',
  templateUrl: './blog-detail-dialog.component.html',
  styleUrls: [],
})
export class BlogDetailDialogComponent implements OnInit {
  @ViewChild('commentContent') commentContent: ElementRef;
  @ViewChild('contentUI') contentUI: ElementRef;
  public newsId: string;
  public news$: Observable<NewsModel>;
  public currentUser$: Observable<UserModel>;
  public comments: Array<CommentModel> = [];
  public userView$: Observable<BaseViewModel>;
  public content: string = '';
  private pageNumber = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BlogDetailDialogComponent>,
    private newsState: state.NewsState,
    private newsService: NewsService,
    private authState: state.AuthState,
    private viewState: state.ViewState,
  ) { }

  ngOnInit(): void {
    this.newsId = this.data.newsId;
    this.news$ = this.newsState.news$;

    this.currentUser$ = this.authState.currentUser$;
    this.newsState.findById(this.newsId);
    this.getCommentList();
  }

  public onFocusComment() {
    this.commentContent.nativeElement.focus();
  }

  public async onScrollLoadComment() {
    const nativeElement = this.contentUI?.nativeElement;
    if (Math.ceil(this.newsState.getTotalComments() / 10) > 1) {

      const zoomRatio = Math.ceil(window.devicePixelRatio ?? 1);
      if ((nativeElement.clientHeight + Math.ceil(nativeElement.scrollTop)) >= (nativeElement.scrollHeight - zoomRatio)) {
        this.pageNumber += 1;

        if (this.pageNumber <= Math.ceil(this.newsState.getTotalComments() / 10)) {
          this.getCommentList(true);
          nativeElement.scrollTop = nativeElement.scrollHeight;
        }
      }
    }
  }

  private getCommentList(isScroll: boolean = false) {
    const viewState = this.viewState.getViewState();
    viewState.paginator.page = this.pageNumber;
    viewState.searchParams = { newsId: this.newsId };

    this.newsState.getCommentList(viewState);

    this.newsService.getComments(viewState).subscribe({
      next: (res: BaseTableResponse<CommentModel>) => {
        if (res && res.items) {
          this.comments = isScroll ? [...this.comments, ...(res.items as Array<CommentModel>)] : res.items;
          console.log(this.comments);
        }
      }
    })
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
    console.log(13);
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
