import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import * as state from '../state/index';
import { ClaimValue, CommonConstants } from '../constants/common-constants';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private authState: state.AuthState, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authState.getCurrentUser();
    if (currentUser.isAdmin) {
      return true;
    }
    const menuPermissions = currentUser?.menuPermissions;
    const permissionData = route.data.permission;
    const actionData = route.data.action;
    let result = true;

    const permissionMenu = menuPermissions?.find(item => item.claimType === permissionData);
    if (permissionMenu) {

      switch (actionData) {
        case ClaimValue.View: result = permissionMenu.isView; break;
        case ClaimValue.Create: result = permissionMenu.isCreate; break;
        case ClaimValue.Edit: result = permissionMenu.isEdit; break;
        case ClaimValue.Delete: result = permissionMenu.isDelete; break;
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
