import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import { UtilsService } from '../../services';
const URL_MENU_FILE = 'assets/data/menu-data.json';

@Injectable()
export class MenuState implements OnDestroy {
  private subs: Array<Subscription> = [];

  private _asideBarMenusSubject: BehaviorSubject<Array<MenuModel>> = new BehaviorSubject(Array());
  public asideBarMenus$: Observable<Array<MenuModel>> = this._asideBarMenusSubject.asObservable();

  private _featureMenusSubject: BehaviorSubject<Array<MenuModel>> = new BehaviorSubject(Array());
  public featureMenus$: Observable<Array<MenuModel>> = this._featureMenusSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();
  

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
  constructor(private utilsService: UtilsService) {
    this.initialAsideBarMenus();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public initialFeatureMenus() {
  }

  private initialAsideBarMenus() {
    this.utilsService.loadFileUrl(URL_MENU_FILE).then((value) => {
      if (value) {
        const data = Object.values(value) as Array<MenuModel>;
        this.setAsideBarMenus(data);
      }
    });
  }

}
