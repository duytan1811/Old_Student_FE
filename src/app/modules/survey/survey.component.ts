import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import * as state from 'src/app/shared/state';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { SurveyEditDialogComponent } from './components/survey-template-edit-dialog/survey-edit-dialog.component';
import { SurveyModel } from 'src/app/shared/models/surveys/survey.mode';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: []
})
export class SurveyComponent implements OnInit {
  public surveys$: Observable<Array<SurveyModel>>;
  public totalSurvey$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public tableView$: Observable<BaseViewModel>;
  public formSearch: FormGroup;
  public statusEnum = StatusEnum;
  public statuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;

  constructor(
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private surveyState: state.SurveyState,
    private viewState: state.ViewState,
    private dialog: MatDialog,
    private pageInfo: PageInfoService,
    private title: Title,
    private authState: state.AuthState
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Mẫu khảo sát');
    this.title.setTitle('Mẫu khảo sát');
    this.isLoading$ = this.surveyState.isLoading$;
    this.totalSurvey$ = this.surveyState.totalSurvey$;
    this.surveys$ = this.surveyState.surveys$;
    this.tableView$ = this.viewState.view$;

    this.initFormSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    dataSearch.startDate = dataSearch.startDate !== '' ? dataSearch.startDate : null;
    dataSearch.endDate = dataSearch.endDate !== '' ? dataSearch.endDate : null;

    viewState.searchParams = dataSearch;
    viewState.sorting.column="CreatedAt";
    this.viewState.setViewState(viewState);
    this.surveyState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.surveyState.search(viewState);
  }

  public goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id,
      isCreate,
    };
    const dialogRef = this.dialog.open(
      SurveyEditDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public goDelete(data: SurveyModel): void {
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
        const res = await this.surveyState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MenuKey.SurveyTemplate,
      rule
    );
  }

  private initFormSearch() {
    this.formSearch = this.fb.group({
      name: [''],
      status: [''],
      startDate:[''],
      endDate:[''],
    });

    this.onSearch();
  }
}
