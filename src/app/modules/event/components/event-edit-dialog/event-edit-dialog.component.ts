import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { EventModel } from 'src/app/shared/models/event/event.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: [],
})
export class EventEditDialogComponent implements OnInit {
  public formGroup: FormGroup;
  public dropdownEventTypes$: Observable<Array<SelectListItem>>;
  public event$: Observable<EventModel>;
  public eventId: string | null = null;
  public ckEditor = ClassicEditorBuild;
  public formStatuses = CommonConstants.FormStatuses;

  constructor(
    private fb: FormBuilder,
    private eventState: state.EventState,
    private flashMessageState: state.FlashMessageState,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EventEditDialogComponent>,
    private dropdownState: state.DropdownState
  ) {}

  ngOnInit(): void {
    this.eventId = this.data.eventId;
    this.event$ = this.eventState.event$;
    this.eventState.findById(this.eventId);
    this.dropdownEventTypes$ = this.dropdownState.dropdownEventTypes$;
    this.dropdownState.getDropdownEventTypes();
    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    data.type = parseInt(data.type);
    data.status = data.status !== '' ? data.status : null;

    let res;
    if (this.eventId !== null) {
      res = await this.eventState.update(this.eventId, data);
    } else {
      res = await this.eventState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (
      res.type === CommonConstants.ResponseType.Success &&
      this.eventId === null
    ) {
      this.formGroup.reset();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      startDateFormat: ['', [Validators.required]],
      endDateFormat: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: [''],
      content: [''],
    });
  }
}
