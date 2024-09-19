import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import * as state from '../state/index';
import { CommonConstants } from '../constants/common-constants';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private authState: state.AuthState, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser= this.authState.getCurrentUser();
    if(currentUser.isAdmin){
      return true;
    }
    const permissionMenus = this.authState.getPermissionMenus();
    const permissionData = route.data.permission;
    const actionData = route.data.action;
    let result = true;

    const permissionMenu = permissionMenus.find(item => item.menuKey === permissionData);
    if (permissionMenu) {
      switch (actionData) {
        case CommonConstants.PERMISSION.VIEW: result = permissionMenu.permission.isView; break;
        case CommonConstants.PERMISSION.CREATE: result = permissionMenu.permission.isCreate; break;
        case CommonConstants.PERMISSION.EDIT: result = permissionMenu.permission.isEdit; break;
        case CommonConstants.PERMISSION.DELETE: result = permissionMenu.permission.isDelete; break;
      }
    } else {
      result = false;
    }
    if (!result) {
      this.router.navigate(['error/403']);
    }

    return result;
  }
}
