import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthModel } from 'src/app/shared/models/auth/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { AuthService } from 'src/app/shared/services';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { PermissionMenuModel } from 'src/app/shared/models/base/permission-menu.model';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthState implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  private currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject(Object());
  public currentUser$: Observable<UserModel> = this.currentUserSubject.asObservable();

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  // public fields
  getCurrentUser(): UserModel {
    return this.currentUserSubject.getValue();
  }

  setCurrentUser(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  getPermissionMenus(): Array<PermissionMenuModel> {
    const user = this.getCurrentUser();

    return user.permissionMenus;
  }

  getIsLoading(): boolean {
    return this.isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public login(userName: string, password: string): Observable<BaseResponse<UserModel>> {
    this.setIsLoading(true);
    return this.authService.login(userName, password).pipe(
      map((res: BaseResponse<AuthModel>) => {
        const result = this.setAuthFromLocalStorage(res.data);
        return res;
      }),
      switchMap((res) => this.getUserByToken(res)),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.setIsLoading(false))
    );
  }

  public logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['auth/login'], {
      queryParams: {},
    });
  }

  public checkPermissionMenu(menuKey: string, rule: number) {
    const user = this.getCurrentUser();

    if (user.isAdmin) return true;
    const permissions = this.getPermissionMenus();
    const permission = permissions.find(p => p.menuKey === menuKey);

    if (!permission) return false;

    if (rule === CommonConstants.PERMISSION.VIEW) return permission.permission.isView;
    if (rule === CommonConstants.PERMISSION.CREATE) return permission.permission.isCreate;
    if (rule === CommonConstants.PERMISSION.EDIT) return permission.permission.isEdit;
    if (rule === CommonConstants.PERMISSION.DELETE) return permission.permission.isDelete;
  }

  public getUserByToken(res?: any): Observable<BaseResponse<UserModel>> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      return of(res);
    }

    this.setIsLoading(true);
    return this.authService.getUserByToken(auth.token).pipe(
      map((res: BaseResponse<UserModel>) => {
        if (res && res.data) {
          this.currentUserSubject.next(res.data);
        } else {
          this.logout();
        }
        return res;
      }),
      finalize(() => this.setIsLoading(false))
    );
  }

  public forgotPassword(email: string): Observable<BaseResponse<boolean>> {
    this.setIsLoading(true);
    return this.authService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    if (auth && auth.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
