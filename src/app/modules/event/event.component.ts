import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { EventModel } from 'src/app/shared/models/event/event.model';
import * as state from 'src/app/shared/state';
import { EventEditDialogComponent } from './components/event-edit-dialog/event-edit-dialog.component';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: []
})
export class EventComponent implements OnInit {
  public eventList$: Observable<Array<EventModel>>;
  public dropdownEventTypes$: Observable<Array<SelectListItem>>;
  public isLoading$: Observable<boolean>;
  public totalEvent$: Observable<number>;
  public userView$: Observable<BaseViewModel>;
  public formGroupSearch: FormGroup;
  public searchStatuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;

  constructor(
    private fb: FormBuilder,
    private viewState: state.ViewState,
    private eventState: state.EventState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
    private title: Title,
    private pageInfo: PageInfoService,
    private dropdownState: state.DropdownState,
    private authState: state.AuthState,
  ) { }

  ngOnInit(): void {
    this.pageInfo.updateTitle('Danh sách bài viết');
    this.title.setTitle('Danh sách bài viết');
    this.isLoading$ = this.eventState.isLoading$;
    this.eventList$ = this.eventState.eventList$;
    this.totalEvent$ = this.eventState.totalEvent$;
    this.userView$ = this.viewState.view$;

    this.dropdownEventTypes$ = this.dropdownState.dropdownEventTypes$;
    this.dropdownState.getDropdownEventTypes();
    this.initFormGroupSearch();

    this.onSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formGroupSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    dataSearch.type = dataSearch.type !== '' ? parseInt(dataSearch.type) : null;
    dataSearch.startDate = dataSearch.startDate !== '' ? dataSearch.startDate : null;
    dataSearch.endDate = dataSearch.endDate !== '' ? dataSearch.endDate : null;

    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.eventState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.eventState.search(viewState);
  }

  public goCreate() {
    this.goEdit(null);
  }

  public goEdit(id: string | null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight='90%'
    dialogConfig.data = {
      eventId:id,
    };
    const dialogRef = this.dialog.open(
      EventEditDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.onSearch()
    });
  }

  public goEventRegisterDetail(id: string | null){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      eventId:id,
    };
    const dialogRef = this.dialog.open(
      EventDetailComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public goDelete(data: EventModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: data.id,
    };
    const dialogRef = this.dialog.open(
      ConfirmDeleteModalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const res = await this.eventState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
        const viewState = this.viewState.getViewState();
        this.eventState.search(viewState);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MenuKey.News,
      rule
    );
  }

  private initFormGroupSearch() {
    this.formGroupSearch = this.fb.group({
      type: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
    });
  }

}
