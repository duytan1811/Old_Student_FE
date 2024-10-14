import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { EventModel } from 'src/app/shared/models/event/event.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
import { EventRegisterDialogComponent } from '../components/event-register-dialog/event-register-dialog.component';
import { EventDetailDialogComponent } from '../components/event-detail-dialog/event-detail-dialog.component';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: [],
})
export class EventListComponent implements OnInit {
  public currentUser$: Observable<UserModel>;
  public events$: Observable<Array<EventModel>>;
  public userView$: Observable<BaseViewModel>;
  public totalEvent$: Observable<number>;
  public status = StatusEnum;
  public dropdownEventType$: Observable<Array<SelectListItem>>;

  constructor(
    private dialog: MatDialog,
    private authState: state.AuthState,
    private eventState: state.EventState,
    private viewState: state.ViewState,
    private dropdownState: state.DropdownState
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authState.currentUser$;
    this.events$ = this.eventState.eventList$;
    this.totalEvent$ = this.eventState.totalEvent$;

    this.dropdownEventType$ = this.dropdownState.dropdownEventTypes$;
    this.dropdownState.getDropdownEventTypes();
    this.onSearch();
  }

  public onSearch() {
    let viewState = this.viewState.getViewState();
    viewState.searchParams = { status: StatusEnum.Active };
    this.eventState.search(viewState);
    this.userView$ = this.viewState.view$;
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.eventState.search(viewState);
  }

  public onSeachByType(event: any) {
    const viewState = this.viewState.getViewState();
    viewState.searchParams = {
      status: StatusEnum.Active,
      type: event.value !== '' ? parseInt(event?.value) : null,
    };
    this.viewState.setViewState(viewState);
    this.eventState.search(viewState);
  }

  public onOpenEventDetail(event: EventModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '95vh';
    dialogConfig.data = { event };
    const dialogRef = this.dialog.open(
      EventDetailDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
