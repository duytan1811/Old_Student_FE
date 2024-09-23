import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { MajorModel } from 'src/app/shared/models/major/major.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-setting-major-edit-modal',
  templateUrl: './setting-major-edit-modal.component.html',
  styleUrls: [],
})
export class SettingMajorEditModalComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public major$: Observable<MajorModel>;
  public isCreate: boolean;
  public id: string;
  public formGroup: FormGroup;
  public statuses = CommonConstants.FormStatuses;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private majorState: state.MajorState,
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private dialogRef: MatDialogRef<SettingMajorEditModalComponent>
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.isCreate = this.data.isCreate;
    this.majorState.findById(this.id);
    this.major$ = this.majorState.major$;

    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    let res;
    if (!this.isCreate) {
      res = await this.majorState.update(this.id, data);
    } else {
      res = await this.majorState.save(data);
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
