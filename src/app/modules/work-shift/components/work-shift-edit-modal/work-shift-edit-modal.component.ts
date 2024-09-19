import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { WorkShiftModel } from 'src/app/shared/models/work-shift/work-shift.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-work-shift-edit-modal',
  templateUrl: './work-shift-edit-modal.component.html',
  styleUrls: ['./work-shift-edit-modal.component.scss']
})
export class WorkShiftEditModalComponent implements OnInit {

  public formGroup: FormGroup;
  public workShift$: Observable<WorkShiftModel>;
  public isLoading$: Observable<boolean>;
  public id: string;
  public isCreate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private workShiftState: state.WorkShiftState,
    private flashMessageState: state.FlashMessageState,
    public dialogRef: MatDialogRef<WorkShiftEditModalComponent>,
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.workShift$ = this.workShiftState.workShift$;
    this.workShiftState.findById(this.id);
    this.isLoading$ = this.workShiftState.isLoading$;

    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let res;
    if (!this.isCreate) {
      res = await this.workShiftState.update(this.id, data);
    } else {
      res = await this.workShiftState.save(data);
    }
    this.flashMessageState.message(res.type, CommonConstants.MENU_KEYS.WorkShift, res.key);
    if (res.type === CommonConstants.RESPONSE_TYPES.SUCCESS) {
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      startDate: [new Date()],
      endDate: [new Date()],
    })
  }

}
