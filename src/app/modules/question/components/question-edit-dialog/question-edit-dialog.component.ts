import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { QuestionModel } from 'src/app/shared/models/questions/question.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-question-edit-dialog',
  templateUrl: './question-edit-dialog.component.html',
  styleUrls: []
})
export class QuestionEditDialogComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public question$: Observable<QuestionModel>;
  public isCreate: boolean;
  public id: string;
  public formGroup: FormGroup;
  public statuses = CommonConstants.FormStatuses;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionState: state.QuestionState,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private dialogRef: MatDialogRef<QuestionEditDialogComponent>
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.questionState.findById(this.id);
    this.question$ = this.questionState.question$;

    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let res;
    if (!this.isCreate) {
      res = await this.questionState.update(this.id, data);
    } else {
      res = await this.questionState.save(data);
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
      isComment: [''],
      status: [null],
    });
  }
}
