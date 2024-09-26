import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import { AuthState, MenuState } from 'src/app/shared/state';
import { ClaimValue } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: [],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;

  asideBarMenus$: Observable<Array<MenuModel>>;
  constructor(private menuState: MenuState
  ) { }

  ngOnInit(): void {
    this.asideBarMenus$ = this.menuState.asideBarMenus$;
  }
}
