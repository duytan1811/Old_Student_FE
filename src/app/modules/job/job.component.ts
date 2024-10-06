import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { JobModel } from 'src/app/shared/models/jobs/job.model';
import * as state from 'src/app/shared/state';
import { JobEditDialogComponent } from './components/job-edit-dialog/job-edit-dialog.component';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: []
})
export class JobComponent implements OnInit {
  public jobList$: Observable<Array<JobModel>>;
  public dropdownMajors$: Observable<Array<SelectListItem>>;
  public isLoading$: Observable<boolean>;
  public totalJob$: Observable<number>;
  public userView$: Observable<BaseViewModel>;
  public formGroupSearch: FormGroup;
  public searchStatuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;

  constructor(
    private fb: FormBuilder,
    private viewState: state.ViewState,
    private jobState: state.JobState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
    private title: Title,
    private pageInfo: PageInfoService,
    private authState: state.AuthState,
    private router: Router,
    private dropdownState:state.DropdownState
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Danh sách việc làm');
    this.pageInfo.updateTitle('Danh sách việc làm');

    this.initFormGroupSearch();

    this.jobList$= this.jobState.jobs$;
    this.totalJob$= this.jobState.totalJob$;
    this.userView$ = this.viewState.view$;
    this.dropdownMajors$= this.dropdownState.dropdownMajors$;
    this.dropdownState.getDropdownMajors();
    this.onSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formGroupSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    dataSearch.type = dataSearch.type !== '' ? parseInt(dataSearch.type) : null;
    dataSearch.countLike = dataSearch.countLike !== '' ? parseInt(dataSearch.countLike) : null;
   
    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.jobState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.jobState.search(viewState);
  }

  public goCreate(){
    this.goEdit(null);
  }
  public goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      jobId:id,
    };
    const dialogRef = this.dialog.open(
      JobEditDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public goDelete(data: JobModel): void {
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
        const res = await this.jobState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
        const viewState = this.viewState.getViewState();
        this.jobState.search(viewState);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MenuKey.Job,
      rule
    );
  }

  private initFormGroupSearch() {
    this.formGroupSearch = this.fb.group({
      title: [''],
      majorId: [''],
      status: [''],
    });
  }

}
