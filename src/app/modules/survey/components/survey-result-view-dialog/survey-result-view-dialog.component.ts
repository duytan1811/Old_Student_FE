import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SurveyResultDetailModel } from 'src/app/shared/models/surveys/survey-result-detail.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-survey-result-view-dialog',
  templateUrl: './survey-result-view-dialog.component.html',
  styleUrls: [],
})
export class SurveyResultViewDialogComponent implements OnInit {
  public surveyId: string;
  public userId: string;
  public surveyResult$: Observable<SurveyResultDetailModel>;

  constructor(
    private surveyState: state.SurveyState,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionState: state.QuestionState,
    private dialogRef: MatDialogRef<SurveyResultViewDialogComponent>
  ) {}

  ngOnInit(): void {
    this.surveyId = this.data.surveyId;
    this.userId = this.data.userId;
    this.surveyResult$ = this.surveyState.surveyResult$;

    this.surveyState.getSurveyDetail(this.surveyId, this.userId);
  }
}
