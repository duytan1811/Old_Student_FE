import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { WorkShiftModel } from 'src/app/shared/models/work-shift/work-shift.model';
import * as state from 'src/app/shared/state';
import { WorkShiftEditModalComponent } from '../work-shift-edit-modal/work-shift-edit-modal.component';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-work-shift-summary',
  templateUrl: './work-shift-summary.component.html',
  styleUrls: ['./work-shift-summary.component.scss']
})
export class WorkShiftSummaryComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public formSearch: FormGroup;
  public workShifts$: Observable<Array<WorkShiftModel>>;
  public workShiftView$: Observable<BaseViewModel>;
  public totalWorkShift$: Observable<number>;
  public statuses = CommonConstants.STATUSES;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private viewState: state.ViewState,
    private workShiftState: state.WorkShiftState,
    private flashMessageState: state.FlashMessageState,
  ) { }

  ngOnInit(): void {
    this.workShiftView$ = this.viewState.view$;
    this.workShifts$ = this.workShiftState.workShifts$;
    this.totalWorkShift$ = this.workShiftState.totalWorkShift$;
    this.isLoading$ = this.workShiftState.isLoading$;
    this.initFormSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formSearch.getRawValue();
    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.workShiftState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.workShiftState.search(viewState);
  }

  public goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      id, isCreate
    };
    const dialogRef = this.dialog.open(WorkShiftEditModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      const viewState = this.viewState.getViewState();
      this.workShiftState.search(viewState);
    });
  }

  public goDelete(data: WorkShiftModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: data.id,
      title: 'Xóa nhóm sản phẩm',
      content: `Bạn có xác nhận xóa nhà cung cấp này?`
    };
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const res = await this.workShiftState.delete(data.id);
        this.flashMessageState.message(res.type, CommonConstants.MENU_KEYS.WorkShift, res.key);
        const viewState = this.viewState.getViewState();
        this.workShiftState.search(viewState);
      }
    });
  }

  private initFormSearch() {
    this.formSearch = this.fb.group({
      name: [''],
      phone: [''],
      address: [''],
    });
  }
}
