import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEmpty } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { StudentAchievementModel } from 'src/app/shared/models/student-achivements/student-achievement.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-student-achievement-edit-dialog',
  templateUrl: './student-achievement-edit-dialog.component.html',
  styleUrls: [],
})
export class StudentAchievementEditDialogComponent implements OnInit {
  public id: string | null;
  public studentId: string | null;
  public studentAchievement: StudentAchievementModel;
  public formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    public dialogRef: MatDialogRef<StudentAchievementEditDialogComponent>,
    private studentAchievementState: state.StudentAchievementState
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.studentId = this.data.studentId;
    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    data.status = data.status != '' ? data.status : null;
    data.studentId = this.studentId;

    let res;
    if (this.id != null) {
      res = await this.studentAchievementState.update(this.id, data);
    } else {
      res = await this.studentAchievementState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (res.type === CommonConstants.RESPONSE_TYPES.SUCCESS) {
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      fromDate: [null],
      toDate: [null],
      status: [''],
    });
  }
}
