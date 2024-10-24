import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { SurveyResultModel } from 'src/app/shared/models/surveys/survey-result.model';
import * as state from 'src/app/shared/state';
import { SurveyResultViewDialogComponent } from '../components/survey-result-view-dialog/survey-result-view-dialog.component';

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: [],
})
export class SurveyResultComponent implements OnInit {
  public surveyResults$: Observable<Array<SurveyResultModel>>;
  public totalSurveyResult$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public tableView$: Observable<BaseViewModel>;
  public formSearch: FormGroup;
  public statusEnum = StatusEnum;
  public statuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;
  public surveyId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private viewState: state.ViewState,
    private pageInfo: PageInfoService,
    private title: Title,
    private surveyState: state.SurveyState,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Danh sách kết quả khảo sát');
    this.title.setTitle('Danh sách kết quả khảo sát');

    this.surveyId = this.activeRoute.snapshot.paramMap.get('id');

    this.totalSurveyResult$ = this.surveyState.totalSurveyResult$;
    this.surveyResults$ = this.surveyState.surveyResults$;
    this.tableView$ = this.viewState.view$;

    this.initFormSearch();

    this.onSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    dataSearch.startDate =
      dataSearch.startDate !== '' ? dataSearch.startDate : null;
    dataSearch.endDate = dataSearch.endDate !== '' ? dataSearch.endDate : null;

    viewState.searchParams = dataSearch;
    viewState.sorting.column = 'CreatedAt';
    this.viewState.setViewState(viewState);
    if (this.surveyId) {
      this.surveyState.searchSurveyResult(this.surveyId, viewState);
    }
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.surveyState.search(viewState);
  }

  public goDetail(userId: string | null): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = {
      surveyId: this.surveyId,
      userId: userId,
    };
    const dialogRef = this.dialog.open(
      SurveyResultViewDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  private initFormSearch() {
    this.formSearch = this.fb.group({
      fullName: [''],
      date: [''],
    });

    this.onSearch();
  }
}
