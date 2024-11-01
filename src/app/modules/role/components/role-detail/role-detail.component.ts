import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';
import { RoleEditModalComponent } from '../role-edit-modal/role-edit-modal.component';
import { RoleUserModalComponent } from '../role-user-modal/role-user-modal.component';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {

  id: string | undefined;
  role$: Observable<RoleModel>;
  isLoading$: Observable<boolean>;
  roleUsers$: Observable<Array<UserModel>>;
  totalRoleUser$: Observable<Number>;
  roleUserView$: Observable<BaseViewModel>;
  userNameSearch: string = '';
  isCheckAllUser: boolean = false;
  subs: Array<Subscription> = [];

  constructor(
    private route: ActivatedRoute,
    private roleState: state.RoleState,
    private viewState: state.ViewState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')?.toString();
    });

    this.isLoading$ = this.roleState.isLoading$;
    this.roleState.findById(this.id);
    this.role$ = this.roleState.role$;

    this.onSearchRoleUsers();
    this.roleUsers$ = this.roleState.roleUsers$;
    this.totalRoleUser$ = this.roleState.totalRoleUser$;

    this.roleUserView$ = this.viewState.view$;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      id, isCreate
    };
    const dialogRef = this.dialog.open(RoleEditModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.roleState.findById(this.id);
    });
  }

  goAddRoleUser(roleId: string | null): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      roleId
    };
    const dialogRef = this.dialog.open(RoleUserModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.onSearchRoleUsers();
    });
  }

  onSearchRoleUsers() {
    const viewState = this.viewState.getViewState();
    viewState.searchParams = { roleId: this.id, userName: this.userNameSearch };
    this.viewState.setViewState(viewState);
    this.roleState.searchUsersByRoleId(viewState);
  }

  paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.roleState.searchUsersByRoleId(viewState);
  }

  onCheckAllUser(event: MatCheckboxChange) {
    const rs = this.roleUsers$.subscribe(roleUsers => {
      if (roleUsers) {
        roleUsers.forEach(ru => ru.selected = event.checked);
      }
    });

    this.subs.push(rs);
  }

  async onDeleteSelectedUsers() {
    if (this.id !== undefined) {
      let selectedUserIds: Array<string> = [];
      const rs = this.roleUsers$.subscribe(async roleUsers => {
        if (roleUsers) {
          selectedUserIds = roleUsers.map(ru => {
            if (ru.selected) return ru.id;
          }) as Array<string>;
        }
      });

      this.subs.push(rs);

      if (selectedUserIds.length > 0) {
        const result = await this.roleState.deleteUserByRole(this.id, selectedUserIds);
        if (result.type === CommonConstants.RESPONSE_TYPES.ERROR) {
          this.flashMessageState.message(result.type, CommonConstants.MENU_KEYS.Role, result.message);
          this.isCheckAllUser = false;
          this.onSearchRoleUsers();
        }
      }
    }
  }

  async onDeleteSelectedUser(id: string) {
    let selectedUserIds: Array<string> = [];
    selectedUserIds.push(id);
    if (selectedUserIds.length > 0) {
      const result = await this.roleState.deleteUserByRole(this.id, selectedUserIds);
      if (result.type === CommonConstants.RESPONSE_TYPES.ERROR) {
        this.flashMessageState.message(result.type, CommonConstants.MENU_KEYS.Role, result.message);
        this.onSearchRoleUsers();
      }
    }
  }
}
