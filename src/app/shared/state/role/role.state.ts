import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { RoleService } from 'src/app/shared/services';
import { FlashMessageState } from '../common/flash-message.state';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { ViewState } from '../base/view.state';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import { MenuState } from '../menu/menu.state';
import { UserModel } from 'src/app/shared/models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _rolesSubject: BehaviorSubject<Array<RoleModel>> = new BehaviorSubject(Array());
  public roles$: Observable<Array<RoleModel>> = this._rolesSubject.asObservable();

  private _totalRoleSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalRole$: Observable<number> = this._totalRoleSubject.asObservable();

  private _roleUsersSubject: BehaviorSubject<Array<UserModel>> = new BehaviorSubject(Array());
  public roleUsers$: Observable<Array<UserModel>> = this._roleUsersSubject.asObservable();

  private _totalRoleUserSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalRoleUser$: Observable<number> = this._totalRoleUserSubject.asObservable();

  private _roleSubject: BehaviorSubject<RoleModel> = new BehaviorSubject(Object());
  public role$: Observable<RoleModel> = this._roleSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  private _permissionMenusSubject: BehaviorSubject<Array<MenuModel>> = new BehaviorSubject(Array());
  public permissionMenus$: Observable<Array<MenuModel>> = this._permissionMenusSubject.asObservable();

  getRoles(): Array<RoleModel> {
    return this._rolesSubject.getValue();
  }

  setRoles(data: Array<RoleModel>) {
    this._rolesSubject.next(data);
  }

  getRoleUsers(): Array<UserModel> {
    return this._roleUsersSubject.getValue();
  }

  setRoleUsers(data: Array<UserModel>) {
    this._roleUsersSubject.next(data);
  }

  getTotalRole(): number {
    return this._totalRoleSubject.getValue();
  }

  setTotalRole(data: number) {
    this._totalRoleSubject.next(data);
  }

  getTotalRoleUser(): number {
    return this._totalRoleUserSubject.getValue();
  }

  setTotalRoleUser(data: number) {
    this._totalRoleUserSubject.next(data);
  }

  getRole(): RoleModel {
    return this._roleSubject.getValue();
  }

  setRole(data: RoleModel) {
    this._roleSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  getPermissionMenus(): Array<MenuModel> {
    return this._permissionMenusSubject.getValue();
  }

  setPermissionMenus(data: Array<MenuModel>) {
    this._permissionMenusSubject.next(data);
  }

  constructor(
    private roleService: RoleService,
    private viewState: ViewState,
    private menuState: MenuState,
    private flashMessageState: FlashMessageState
  ) {
    this.search(new BaseViewModel());
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.roleService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<RoleModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setRoles(res.items);
        this.setTotalRole(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get roles`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public searchUsersByRoleId(data: any) {
    if (data.searchParams.roleId) {
      this.setIsLoading(true);
      const sub = this.roleService.searchUsersByRoleId(data).subscribe({
        next: (res: BaseTableResponse<UserModel>) => {
          this.setIsLoading(false);
          this.setRoleUsers(res.items);
          this.setTotalRoleUser(res.total);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get role users`, err);
        }
      })

      this.unsubscribe.push(sub);
    }
  }

  public findById(id: string | undefined) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.roleService.findById(id).subscribe({
        next: (res: BaseResponse<RoleModel>) => {
          this.setRole(res.data);
          this.menuState.initialFeatureMenus(res.data.menuPermissions);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get role`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      const role = new RoleModel();
      this.menuState.initialFeatureMenus(role.menuPermissions);
      const sub = this.menuState.featureMenus$.subscribe(menus => {
        this.setRole(role);
      });

      this.unsubscribe.push(sub);
    }
    this.setIsLoading(false);
  }

  public save(obj: RoleModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.roleService.save(obj).subscribe({
        next: (result) => {
          this.setIsLoading(false);
          this.search(cv);
          resolve(result);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    })
  }

  public update(id: string, obj: RoleModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.roleService.update(id, obj).subscribe({
        next: (res) => {
          this.setIsLoading(false);
          this.search(cv);
          resolve(res);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    })
  }

  public delete(id: string): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.roleService.delete(id).subscribe({
        next: (res) => {
          this.search(cv);
          this.setIsLoading(false);
          resolve(res);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    })
  }

  public saveUserByRole(id: string, userIds: Array<string>): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.roleService.saveUserByRole(id, userIds).subscribe({
        next: (res) => {
          this.setIsLoading(false);
          resolve(res);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    })
  }

  public deleteUserByRole(id: string | undefined, userIds: Array<string>): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      if (id !== undefined) {
        this.roleService.deleteUserByRole(id, userIds).subscribe({
          next: (res) => {
            this.setIsLoading(false);
            resolve(res);
          },
          error: (e) => {
            this.setIsLoading(false);
            resolve(e.error?.message || e);
          },
        });
      }
    })
  }
}
