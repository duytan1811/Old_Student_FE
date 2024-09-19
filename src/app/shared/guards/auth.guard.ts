import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import * as state from '../state/index';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authState: state.AuthState) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authState.getCurrentUser();
    if (currentUser && currentUser.id) {
      return true;
    }

    this.authState.logout();
    return false;
  }
}
