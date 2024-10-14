import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { JobRegisterModel } from 'src/app/shared/models/jobs/job-register.model';
import { JobModel } from 'src/app/shared/models/jobs/job.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-job-register-detail-dialog',
  templateUrl: './job-register-detail-dialog.component.html',
  styleUrls: []
})
export class JobRegisterDetailDialogComponent implements OnInit {
  public job$: Observable<JobModel>;
  public userApplies$: Observable<Array<JobRegisterModel>>;
  public jobId: string;
  public userView$: Observable<BaseViewModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JobRegisterDetailDialogComponent>,
    private jobState: state.JobState,
    private viewState: state.ViewState
  ) { }

  ngOnInit(): void {
    this.jobId = this.data.jobId;
    this.job$ = this.jobState.job$;
    this.userApplies$ = this.jobState.userApplies$;
    
    this.userView$ = this.viewState.view$;
    this.jobState.findById(this.jobId);
    this.onSearchUserApplies();
  }

  public onSearchUserApplies() {
    const viewState = this.viewState.getViewState();
    this.jobState.searchUserApplies(this.jobId, viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.jobState.searchUserApplies(this.jobId, viewState);
  }

}
