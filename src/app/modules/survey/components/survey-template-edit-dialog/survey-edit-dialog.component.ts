import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { SurveyModel } from 'src/app/shared/models/surveys/survey.mode';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-survey-edit-dialog',
  templateUrl: './survey-edit-dialog.component.html',
  styleUrls: [],
})
export class SurveyEditDialogComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public survey$: Observable<SurveyModel>;
  public drpQuestions$: Observable<Array<SelectListItem>>;
  public drpSurveyTypes$: Observable<Array<SelectListItem>>;
  public isCreate: boolean;
  public id: string;
  public formGroup: FormGroup;
  public statuses = CommonConstants.FormStatuses;
  public questionsSelected: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surveyState: state.SurveyState,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private dropdownState: state.DropdownState,
    private dialogRef: MatDialogRef<SurveyEditDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initFormGroup();

    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.survey$ = this.surveyState.survey$;
    this.drpQuestions$ = this.dropdownState.dropdownQuestions$;
    this.drpSurveyTypes$ = this.dropdownState.dropdownSurveyTypes$;

    this.surveyState.findById(this.id);
    this.dropdownState.getDropdownQuestions();
    this.dropdownState.getDropdownSurveyTypes();

    this.drpQuestions$.subscribe((data) => {
      if (data) {
        this.survey$.subscribe((res) => {
          if (res && res.questionIds) {
            this.questionsSelected.length = 0;
            res.questionIds.forEach((item: any, index: number) => {
              this.questionsSelected.push({
                index: index,
                value: item,
                dropdownList: data,
              });
            });
          }
        });
      }
    });
  }

  public async onSave() {
    let data = this.formGroup.getRawValue();
    const questionIds = this.questionsSelected.map((x) => {
      if (x.value !== '') return x.value;
    });
    data.status = data.status !== '' ? data.status : null;
    data.questionIds = questionIds;
    data.type = parseInt(data.type);

    let res;
    if (!this.isCreate) {
      res = await this.surveyState.update(this.id, data);
    } else {
      res = await this.surveyState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (res.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }

  public onFocusQuestions(index: number) {
    let data = this.questionsSelected.find((x) => x.index === index);
    const questionIds = this.questionsSelected.map((x) => {
      if (x.value !== '' && x.index !== index) return x.value;
    });

    this.drpQuestions$.subscribe((res) => {
      if (res) {
        data.dropdownList = [
          ...res.filter((x) => !questionIds.includes(x.value)),
        ];
      }
    });
  }

  public onChangeDropdownList(index: number, event: any) {
    let data = this.questionsSelected.find((x: any) => x.index == index);
    if (data) {
      data.value = event.target?.value;
    }
  }

  public onAddQuestion() {
    this.questionsSelected.push({
      index: this.questionsSelected.length,
      value: '',
      dropdownList: null,
    });
  }

  public onRemoveQuestion(index: number) {
    const indexEl = this.questionsSelected.findIndex((x) => x.index === index);
    this.questionsSelected.splice(indexEl, 1);
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      startDateFormat: ['', [Validators.required]],
      endDateFormat: ['', [Validators.required]],
      status:[null]
    });
  }
}
