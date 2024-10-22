import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { SurveyTemplateModel } from 'src/app/shared/models/survey-templates/survey-template.mode';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-survey-template-edit-dialog',
  templateUrl: './survey-template-edit-dialog.component.html',
  styleUrls: []
})
export class SurveyTemplateEditDialogComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public surveyTemplate$: Observable<SurveyTemplateModel>;
  public drpQuestions$: Observable<Array<SelectListItem>>;
  public drpSurveyTypes$: Observable<Array<SelectListItem>>;
  public isCreate: boolean;
  public id: string;
  public formGroup: FormGroup;
  public statuses = CommonConstants.FormStatuses;
  public questionIdsSelected: Array<string> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surveyTemplateState: state.SurveyTemplateState,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private dropdownState: state.DropdownState,
    private dialogRef: MatDialogRef<SurveyTemplateEditDialogComponent>
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.surveyTemplateState.findById(this.id);
    this.surveyTemplate$ = this.surveyTemplateState.surveyTemplate$;

    this.drpQuestions$ = this.dropdownState.dropdownQuestions$;
    this.drpSurveyTypes$ = this.dropdownState.dropdownSurveyTypes$;
    this.dropdownState.getDropdownQuestions();
    this.dropdownState.getDropdownSurveyTypes();
    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let res;
    if (!this.isCreate) {
      res = await this.surveyTemplateState.update(this.id, data);
    } else {
      res = await this.surveyTemplateState.save(data);
    }
    this.flashMessageState.message(
      res.type,
      res.message
    );
    if (res.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      status: [null],
    });
  }
}
