import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { JobModel } from 'src/app/shared/models/jobs/job.model';
import { ApplyJobComponent } from '../apply-job/apply-job.component';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: [],
})
export class JobDetailComponent implements OnInit {
  public job: JobModel;
  public user$:Observable<UserModel>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<JobDetailComponent>,
    private authState:state.AuthState,
  ) {}

  ngOnInit(): void {
    this.job = this.data.job;
    this.user$ = this.authState.currentUser$;
  }

  public onOpenApplyJob(): void {
    if (this.job.isApplyed || this.job.isExpired) {
      return;
    }
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = { job: this.job };
    const dialogRef = this.dialog.open(ApplyJobComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
