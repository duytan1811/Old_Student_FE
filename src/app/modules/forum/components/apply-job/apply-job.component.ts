import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { JobModel } from 'src/app/shared/models/jobs/job.model';
import { JobDetailComponent } from '../job-detail/job-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as state from 'src/app/shared/state';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { convertFileToBase64 } from 'src/app/shared/helper/common.helper';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/users/user.model';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: [],
})
export class ApplyJobComponent implements OnInit {
  public job: JobModel;
  public formGroup: FormGroup;
  public currentUser$: Observable<UserModel>;
  public isUploadCV: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ApplyJobComponent>,
    private fb: FormBuilder,
    private jobState: state.JobState,
    private flashMessageState: state.FlashMessageState,
    private authState: state.AuthState,
    private viewState: state.ViewState
  ) {}

  ngOnInit(): void {
    this.job = this.data.job;
    this.currentUser$ = this.authState.currentUser$;
    this.initFormGroup();
  }

  public onOpenJobDetail(): void {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = { job: this.job };
    const dialogRef = this.dialog.open(JobDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public onChangeFileAttach(event: any) {
    const file = event.target.files[0];
    convertFileToBase64(file)
      .then((base64String) => {
        this.formGroup.get('fileName')?.setValue(file.name);
        this.formGroup.get('fileBase64')?.setValue(base64String);
        this.isUploadCV = true;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public async onSend() {
    const data = this.formGroup.getRawValue();
    data.jobId = this.job.id;

    const result = await this.jobState.applyJob(data);
    this.flashMessageState.message(result.type, result.message);
    if (result.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
      const viewState = this.viewState.getViewState();
      this.jobState.search(viewState);
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      fullName: ['', Validators.required],
      content: [''],
      fileBase64: [''],
      fileName: [''],
    });
    this.currentUser$.subscribe((res) => {
      if (res) {
        this.formGroup.get('fullName')?.setValue(res.fullName);
      }
    });
  }
}
