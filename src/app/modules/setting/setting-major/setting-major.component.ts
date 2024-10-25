import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import * as state from 'src/app/shared/state';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { MajorModel } from 'src/app/shared/models/major/major.model';
import { PageInfoService } from 'src/app/_metronic/layout';
import { Title } from '@angular/platform-browser';
import { SettingMajorEditModalComponent } from './components/setting-major-edit-modal/setting-major-edit-modal.component';

@Component({
  selector: 'app-setting-major',
  templateUrl: './setting-major.component.html',
  styleUrls: [],
})
export class SettingMajorComponent implements OnInit {
  public majors$: Observable<Array<MajorModel>>;
  public totalMajor$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public tableView$: Observable<BaseViewModel>;
  public formSearch: FormGroup;
  public statusEnum = StatusEnum;
  public statuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;

  constructor(
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private majorState: state.MajorState,
    private viewState: state.ViewState,
    private dialog: MatDialog,
    private pageInfo: PageInfoService,
    private title: Title,
    private authState: state.AuthState
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Nghề nghiệp');
    this.title.setTitle('Nghề nghiệp');
    this.isLoading$ = this.majorState.isLoading$;
    this.totalMajor$ = this.majorState.totalMajor$;
    this.majors$ = this.majorState.majors$;
    this.tableView$ = this.viewState.view$;

    this.initFormSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? parseInt(dataSearch.status) : null;
    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.majorState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.majorState.search(viewState);
  }

  public goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id,
      isCreate,
    };
    const dialogRef = this.dialog.open(
      SettingMajorEditModalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public goDelete(data: MajorModel): void {
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
        const res = await this.majorState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MenuKey.Major,
      rule
    );
  }

  private initFormSearch() {
    this.formSearch = this.fb.group({
      name: [''],
      status: [''],
    });

    this.onSearch();
  }
}
