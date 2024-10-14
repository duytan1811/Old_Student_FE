import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { EventRegisterModel } from 'src/app/shared/models/event/event-register.model';
import { EventModel } from 'src/app/shared/models/event/event.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: []
})
export class EventDetailComponent implements OnInit {
  public event$: Observable<EventModel>;
  public eventRegisters$: Observable<Array<EventRegisterModel>>;
  public eventId: string;
  public userView$: Observable<BaseViewModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventDetailComponent>,
    private eventState: state.EventState,
    private viewState: state.ViewState
  ) { }

  ngOnInit(): void {
    this.eventId = this.data.eventId;
    this.event$ = this.eventState.event$;
    this.eventRegisters$ = this.eventState.eventRegisters$;

    this.userView$ = this.viewState.view$;
    this.eventState.findById(this.eventId);
    this.onSearchEventRegister();
  }

  public onSearchEventRegister() {
    const viewState = this.viewState.getViewState();
    this.eventState.getEventRegisterList(this.eventId, viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.eventState.getEventRegisterList(this.eventId, viewState);
  }
}
