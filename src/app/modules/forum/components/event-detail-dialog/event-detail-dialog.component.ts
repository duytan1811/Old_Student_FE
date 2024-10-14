import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/shared/models/event/event.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
import { EventRegisterDialogComponent } from '../event-register-dialog/event-register-dialog.component';

@Component({
  selector: 'app-event-detail-dialog',
  templateUrl: './event-detail-dialog.component.html',
  styleUrls: []
})
export class EventDetailDialogComponent implements OnInit {
  public event: EventModel;
  public user$: Observable<UserModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EventDetailDialogComponent>,
    private authState: state.AuthState,
  ) { }

  ngOnInit(): void {
    this.event = this.data.event;
    this.user$ = this.authState.currentUser$;
  }

  public onOpenEventRegister(): void {
    if (this.event.isRegister
      || (!this.event.isRegister && (this.event.isExpired || this.event.isProgress))) {
      return;
    }
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = { event: this.event };
    const dialogRef = this.dialog.open(EventRegisterDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
