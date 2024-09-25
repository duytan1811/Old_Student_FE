import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: [],
})
export class UserSummaryComponent implements OnInit {
  public users$: Observable<Array<UserModel>>;
  public isLoading$: Observable<boolean>;
  public totalUser$: Observable<number>;
  public userView$: Observable<BaseViewModel>;
  public formGroupSearch: FormGroup;
  public permissionConstants = ClaimValue;
  public searchStatuses = CommonConstants.SearchStatus;

  constructor(
    private fb: FormBuilder,
    private viewState: state.ViewState,
    private userState: state.UserState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
    private authState: state.AuthState
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.userState.isLoading$;
    this.users$ = this.userState.users$;
    this.totalUser$ = this.userState.totalUser$;
    this.userView$ = this.viewState.view$;

    this.initFormGroupSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formGroupSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.userState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.userState.search(viewState);
  }

  public goEdit(id: string | null, isCreate: boolean = true) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
      id,
      isCreate,
    };
    const dialogRef = this.dialog.open(UserEditModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
      }
    });
  }

  public goDelete(data: UserModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: data.id,
      title: 'Xóa tài khoản',
      content: `Bạn có xác nhận xóa tài khoản này?`,
    };
    const dialogRef = this.dialog.open(
      ConfirmDeleteModalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const res = await this.userState.delete(data.id);
        this.flashMessageState.message(
          res.type,
          res.message
        );
        const viewState = this.viewState.getViewState();
        this.userState.search(viewState);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MENU_KEYS.User,
      rule
    );
  }

  private initFormGroupSearch() {
    this.formGroupSearch = this.fb.group({
      userName: [''],
      name: [''],
      email: [''],
      status: [''],
    });
  }
}
