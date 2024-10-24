import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { SurveyModel } from 'src/app/shared/models/surveys/survey.mode';
import * as state from 'src/app/shared/state';
import { SubmitSurveyDialogComponent } from '../submit-survey-dialog/submit-survey-dialog.component';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';

@Component({
  selector: 'app-action-survey',
  templateUrl: './action-survey.component.html',
  styleUrls: [],
})
export class ActionSurveyComponent implements OnInit {
  public surveys$: Observable<Array<SurveyModel>>;
  public currentUser$: Observable<UserModel>;
  public totalSurvey$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public tableView$: Observable<BaseViewModel>;

  constructor(
    private surveyState: state.SurveyState,
    private viewState: state.ViewState,
    private authState: state.AuthState,
    private pageInfo: PageInfoService,
    private title: Title,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Mẫu khảo sát');
    this.title.setTitle('Mẫu khảo sát');
    this.isLoading$ = this.surveyState.isLoading$;
    this.totalSurvey$ = this.surveyState.totalSurvey$;
    this.surveys$ = this.surveyState.surveys$;
    this.tableView$ = this.viewState.view$;
    this.currentUser$ = this.authState.currentUser$;

    this.onSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const data = {
      status: StatusEnum.Active,
      isNotExpried: true,
    };

    viewState.searchParams = data;
    viewState.sorting.column = 'IsSurveyed';
    this.viewState.setViewState(viewState);
    this.surveyState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.surveyState.search(viewState);
  }

  public goSubmit(survey: SurveyModel): void {
    if (survey.isExpried) return;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = {
      id: survey?.id,
    };
    const dialogRef = this.dialog.open(
      SubmitSurveyDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
