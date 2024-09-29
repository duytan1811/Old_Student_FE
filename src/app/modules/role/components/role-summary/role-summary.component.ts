import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoleEditModalComponent } from '../role-edit-modal/role-edit-modal.component';
import * as state from 'src/app/shared/state';
import { Observable } from 'rxjs';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import {
  ClaimValue,
  CommonConstants,
  MenuList,
} from 'src/app/shared/constants/common-constants';
import { RoleUserModalComponent } from '../role-user-modal/role-user-modal.component';
import { PermissionModel } from 'src/app/shared/models/base/permission.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Title } from '@angular/platform-browser';
import { PageInfoService } from 'src/app/_metronic/layout';

@Component({
  selector: 'app-role-summary',
  templateUrl: './role-summary.component.html',
  styleUrls: [],
})
export class RoleSummaryComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public roles$: Observable<Array<RoleModel>>;
  public totalRole$: Observable<number>;
  public claimValue= ClaimValue;

  constructor(
    private dialog: MatDialog,
    private viewState: state.ViewState,
    private roleState: state.RoleState,
    private authState: state.AuthState,
    private flashMessageState: state.FlashMessageState,
    private title: Title,
    private pageInfo: PageInfoService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Phân quyền');
    this.pageInfo.updateTitle('Phân quyền');
    this.roles$ = this.roleState.roles$;
    this.totalRole$ = this.roleState.totalRole$;
    this.isLoading$ = this.roleState.isLoading$;
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
    const dialogRef = this.dialog.open(RoleEditModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.roleState.search(new BaseViewModel());
    });
  }

  public onOpenEditRoleUser(roleId: string | null): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      roleId,
    };
    const dialogRef = this.dialog.open(RoleUserModalComponent, dialogConfig);
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
