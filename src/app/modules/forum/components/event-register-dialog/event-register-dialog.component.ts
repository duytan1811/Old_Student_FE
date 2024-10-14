import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/shared/models/event/event.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
import { EventDetailDialogComponent } from '../event-detail-dialog/event-detail-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-event-register-dialog',
  templateUrl: './event-register-dialog.component.html',
  styleUrls: []
})
export class EventRegisterDialogComponent implements OnInit {
  public event: EventModel;
  public user$: Observable<UserModel>;
  public formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EventRegisterDialogComponent>,
    private authState: state.AuthState,
    private fb: FormBuilder,
    private eventState: state.EventState,
    private flashMessageState: state.FlashMessageState,
    private viewState: state.ViewState
  ) { }

  ngOnInit(): void {
    this.event = this.data.event;
    this.user$ = this.authState.currentUser$;

    this.initFormGroup();
  }

  public async onRegister() {
    const data = this.formGroup.getRawValue();
    data.eventId = this.event.id;

    const result = await this.eventState.register(data);
    this.flashMessageState.message(result.type, result.message);
    if (result.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
      const viewState = this.viewState.getViewState();
      this.eventState.search(viewState);
    }
  }

  public onOpenEventDetail(): void {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = { event: this.event };
    const dialogRef = this.dialog.open(EventDetailDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => { });
  }
  private initFormGroup() {
    this.user$.subscribe(data => {
      if (data) {
        this.formGroup = this.fb.group({
          phoneNumber: [data.phone, Validators.required],
          email: [data.email, Validators.email]
        })
      }
    })
  }
}
