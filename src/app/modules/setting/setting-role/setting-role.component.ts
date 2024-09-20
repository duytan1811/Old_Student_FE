import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import * as state from 'src/app/shared/state';
import { SettingRoleEditDialogComponent } from './components/setting-role-edit-dialog/setting-role-edit-dialog.component';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { SettingRoleUserDialogComponent } from './components/setting-role-user-dialog/setting-role-user-dialog.component';

@Component({
  selector: 'app-setting-role',
  templateUrl: './setting-role.component.html',
  styleUrls: [],
})
export class SettingRoleComponent implements OnInit {
  public roles$: Observable<Array<RoleModel>>;
  public totalRole$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public tableView$: Observable<BaseViewModel>;
  public formSearch: FormGroup;
  public statusEnum = StatusEnum;
  public statuses = CommonConstants.SearchStatus;

  constructor(
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private roleState: state.RoleState,
    private viewState: state.ViewState,
    private dialog: MatDialog,
    private pageInfo: PageInfoService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Phân quyền');
    this.title.setTitle('Phân quyền');
    this.isLoading$ = this.roleState.isLoading$;
    this.totalRole$ = this.roleState.totalRole$;
    this.roles$ = this.roleState.roles$;
    this.tableView$ = this.viewState.view$;

    this.initFormSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.roleState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.roleState.search(viewState);
  }

  public goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      id,
      isCreate,
    };
    const dialogRef = this.dialog.open(
      SettingRoleEditDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public onOpenRoleUser(role: RoleModel | null): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      role,
    };
    const dialogRef = this.dialog.open(
      SettingRoleUserDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public goDelete(data: RoleModel): void {
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
        const res = await this.roleState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
      }
    });
  }

  private initFormSearch() {
    this.formSearch = this.fb.group({
      name: [''],
      status: [''],
    });

    this.onSearch();
  }
}
