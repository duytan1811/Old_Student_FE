import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import { UtilsService } from '../../services';
import { PermissionModel } from '../../models/base/permission.model';
import { ClaimValue } from '../../constants/common-constants';
import { AuthState } from '../auth/auth.state';
const URL_MENU_FILE = 'assets/data/menu-data.json';

@Injectable()
export class MenuState implements OnDestroy {
  private subs: Array<Subscription> = [];

  private _asideBarMenusSubject: BehaviorSubject<Array<MenuModel>> =
    new BehaviorSubject(Array());
  public asideBarMenus$: Observable<Array<MenuModel>> =
    this._asideBarMenusSubject.asObservable();

  private _featureMenusSubject: BehaviorSubject<Array<MenuModel>> =
    new BehaviorSubject(Array());
  public featureMenus$: Observable<Array<MenuModel>> =
    this._featureMenusSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    Boolean()
  );
  public isLoading$: Observable<boolean> =
    this._isLoadingSubject.asObservable();

  getAsideBarMenus(): Array<MenuModel> {
    return this._asideBarMenusSubject.getValue();
  }

  setAsideBarMenus(data: Array<MenuModel>) {
    this._asideBarMenusSubject.next(data);
  }

  getFeatureMenus(): Array<MenuModel> {
    return this._featureMenusSubject.getValue();
  }

  setFeatureMenus(data: Array<MenuModel>) {
    this._featureMenusSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }
  constructor(private utilsService: UtilsService,
    private authState: AuthState,
  ) {
    this.initialAsideBarMenus();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public initialFeatureMenus(menuPermissions: Array<PermissionModel>) {
    this.utilsService.loadFileUrl(URL_MENU_FILE).then((value) => {
      if (value) {
        const data = Object.values(value) as Array<MenuModel>;
        data.forEach((menu) => {
          menu.permission = new PermissionModel();

          const menuPermission = menuPermissions.find(
            (x) => x.claimType === menu.key
          );
          if (menuPermission) {
            menu.permission.isView = menuPermission.isView;
            menu.permission.isCreate = menuPermission.isCreate;
            menu.permission.isEdit = menuPermission.isEdit;
            menu.permission.isDelete = menuPermission.isDelete;
          }

          if (menu.items && menu.items.length > 0) {
            menu.items.forEach((subMenu) => {
              subMenu.permission = new PermissionModel();

              const subMenuPermission = menuPermissions.find(
                (x) => x.claimType === subMenu.key
              );
              if (subMenuPermission) {
                subMenu.permission.isView = subMenuPermission.isView;
                subMenu.permission.isCreate = subMenuPermission.isCreate;
                subMenu.permission.isEdit = subMenuPermission.isEdit;
                subMenu.permission.isDelete = subMenuPermission.isDelete;
              }

              if (subMenu.permission.isView || subMenu.permission.isCreate
                || subMenu.permission.isEdit || subMenu.permission.isDelete
              ) {
                menu.expand = true;
              }
            });
          }
        });
        this.setFeatureMenus(data);
      }
    });
  }

  private initialAsideBarMenus() {
    this.utilsService.loadFileUrl(URL_MENU_FILE).then((value) => {
      if (value) {
        const data = Object.values(value) as Array<MenuModel>;
        let dataLatest: Array<MenuModel> = [];

        data.forEach((menu, menuIndex) => {
          if (menu.items?.length === 0 || menu.items === null) {
            if (this.checkHasPermission(menu.key)) {
              dataLatest.push(menu);
            }
          } else {
            let countSubMenu = 0;
            let removeSubMenu: Array<string> = [];
            menu.items.forEach((subMenu, subMenuIndex) => {
              if (this.checkHasPermission(subMenu.key)) {
                countSubMenu++;
              } else {
                removeSubMenu.push(subMenu.key);
              }
            })

            if (countSubMenu > 0) {
              menu.items = menu.items?.filter(x => !removeSubMenu.includes(x.key));

              dataLatest.push(menu);
            }
          }
        })
        this.setAsideBarMenus(dataLatest);
      }
    });
  }

  public checkHasPermission(menuKey: string) {
    return this.authState.checkPermissionMenu(menuKey, ClaimValue.View) || this.authState.checkPermissionMenu(menuKey, ClaimValue.Create)
      || this.authState.checkPermissionMenu(menuKey, ClaimValue.Edit) || this.authState.checkPermissionMenu(menuKey, ClaimValue.Delete);
  }
}
