import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { QuestionModel } from 'src/app/shared/models/questions/question.model';
import { SurveyModel } from 'src/app/shared/models/surveys/survey.mode';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-submit-survey-dialog',
  templateUrl: './submit-survey-dialog.component.html',
  styleUrls: [],
})
export class SubmitSurveyDialogComponent implements OnInit {
  public survey$: Observable<SurveyModel>;
  public id: string;
  public questions: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surveyState: state.SurveyState,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private dropdownState: state.DropdownState,
    private dialogRef: MatDialogRef<SubmitSurveyDialogComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.survey$ = this.surveyState.survey$;

    this.surveyState.findById(this.id);
    this.initQuestions();
  }

  public async onSave() {
    if (!this.inValidForm()) {
      
      const data = {
        surevyId: this.id,
        questions: this.questions,
      };

      const res = await this.surveyState.saveSurveyResult(this.id, data);
      this.flashMessageState.message(res.type, res.message);
      if (res.type === CommonConstants.ResponseType.Success) {
        this.dialogRef.close();
      }
    }
  }

  public inValidForm() {
    let err = 0;
    this.questions.forEach((ques: any) => {
      if (ques.isComment && ques.comment === '') err++;
      if (!ques.isComment && ques.point === null) err++;
    });
    return err > 0;
  }

  private initQuestions() {
    this.survey$.subscribe((res: SurveyModel) => {
      if (res && res.questions) {
        this.questions.length = 0;
        res.questions.forEach((que: QuestionModel) => {
          this.questions.push({
            questionId: que.id,
            name: que.name,
            isComment: que.isComment,
            point: null,
            comment: '',
          });
        });
      }
    });
  }
}
