import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { ContributeModel } from 'src/app/shared/models/contributes/contribute.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-contribute-save-dialog',
  templateUrl: './contribute-save-dialog.component.html',
  styleUrls: [],
})
export class ContributeSaveDialogComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public contribute$: Observable<ContributeModel>;
  public drpStudent$: Observable<Array<SelectListItem>>;
  public drpContributeTypes$: Observable<Array<SelectListItem>>;
  public isCreate: boolean;
  public id: string;
  public formGroup: FormGroup;
  public statuses = CommonConstants.FormStatuses;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contributeState: state.ContributeState,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private drpState: state.DropdownState,
    private dialogRef: MatDialogRef<ContributeSaveDialogComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.contributeState.findById(this.id);
    this.contribute$ = this.contributeState.contribute$;

    this.drpStudent$ = this.drpState.dropdownStudents$;
    this.drpContributeTypes$ = this.drpState.dropdownContributeTypes$;
    
    this.drpState.getDropdownStudents();
    this.drpState.getDropdownContributeTypes();

    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let res;
    if (!this.isCreate) {
      res = await this.contributeState.update(this.id, data);
    } else {
      res = await this.contributeState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (res.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      studentId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amount: [''],
      detail: [''],
      status: [null],
    });
  }
}
