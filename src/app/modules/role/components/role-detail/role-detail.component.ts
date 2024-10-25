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
import {
  ClaimValue,
  CommonConstants,
  MenuList,
} from 'src/app/shared/constants/common-constants';
import { PermissionModel } from 'src/app/shared/models/base/permission.model';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: [],
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  public id: string | undefined;
  public role$: Observable<RoleModel>;
  public isLoading$: Observable<boolean>;
  public roleUsers$: Observable<Array<UserModel>>;
  public totalRoleUser$: Observable<Number>;
  public roleUserView$: Observable<BaseViewModel>;
  public userNameSearch: string = '';
  public isCheckAllUser: boolean = false;
  public claimValue = ClaimValue;

  private subs: Array<Subscription> = [];

  constructor(
    private route: ActivatedRoute,
    private roleState: state.RoleState,
    private viewState: state.ViewState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
    private authState: state.AuthState
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
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
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id,
      isCreate,
    };
    const dialogRef = this.dialog.open(RoleEditModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.roleState.findById(this.id);
    });
  }

  goAddRoleUser(roleId: string | null): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      roleId,
    };
    const dialogRef = this.dialog.open(RoleUserModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
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
    const rs = this.roleUsers$.subscribe((roleUsers) => {
      if (roleUsers) {
        roleUsers.forEach((ru) => (ru.selected = event.checked));
      }
    });

    this.subs.push(rs);
  }

  async onDeleteSelectedUsers() {
    if (this.id !== undefined) {
      let selectedUserIds: Array<string> = [];
      const rs = this.roleUsers$.subscribe(async (roleUsers) => {
        if (roleUsers) {
          selectedUserIds = roleUsers.map((ru) => {
            if (ru.selected) return ru.id;
          }) as Array<string>;
        }
      });

      this.subs.push(rs);

      if (selectedUserIds.length > 0) {
        const result = await this.roleState.deleteUserByRole(
          this.id,
          selectedUserIds
        );
        if (result.type === CommonConstants.ResponseType.Error) {
          this.flashMessageState.message(result.type, result.message);
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
      const result = await this.roleState.deleteUserByRole(
        this.id,
        selectedUserIds
      );
      this.flashMessageState.message(result.type, result.message);

      if (result.type === CommonConstants.ResponseType.Success) {
        this.onSearchRoleUsers();
      }
    }
  }

  public getDescriptionMenuPermission(menuPermission: PermissionModel) {
    let result = '';
    const menuList = MenuList;
    let permissionList: Array<string> = [];
    const menu = menuList.find((x) => x.key === menuPermission.claimType);
    if (menu != null) {
      result += menu.display;
    }
    if (menuPermission.isView) permissionList.push('Xem');
    if (menuPermission.isCreate) permissionList.push('Thêm');
    if (menuPermission.isEdit) permissionList.push('Sửa');
    if (menuPermission.isDelete) permissionList.push('Xóa');

    if (permissionList) {
      result += `: ${permissionList.join(', ')}`;
    }

    return result;
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(CommonConstants.MenuKey.Role, rule);
  }
}
