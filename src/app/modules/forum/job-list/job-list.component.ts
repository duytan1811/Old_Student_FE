import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BlogDetailDialogComponent } from 'src/app/shared/components/blog-detail-dialog/blog-detail-dialog.component';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { ForumModel } from 'src/app/shared/models/forum/forum.model';
import { JobModel } from 'src/app/shared/models/jobs/job.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
import { EditNewsDialogComponent } from '../components/edit-news-dialog/edit-news-dialog.component';
import { JobDetailComponent } from '../components/job-detail/job-detail.component';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: [],
})
export class JobListComponent implements OnInit {
  public currentUser$: Observable<UserModel>;
  public jobs$: Observable<Array<JobModel>>;
  public userView$: Observable<BaseViewModel>;
  public totalJob$: Observable<number>;
  public status = StatusEnum;

  constructor(
    private dialog: MatDialog,
    private authState: state.AuthState,
    private jobState: state.JobState,
    private newState: state.NewsState,
    private viewState: state.ViewState
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authState.currentUser$;
    this.jobs$ = this.jobState.jobs$;
    this.totalJob$ = this.jobState.totalJob$;
    this.onSearch();
  }

  public onSearch() {
    let viewState = this.viewState.getViewState();
    this.jobState.search(viewState);
    this.userView$ = this.viewState.view$;
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.jobState.search(viewState);
  }

  public onOpenJobDetail(job: JobModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = { job };
    const dialogRef = this.dialog.open(JobDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
