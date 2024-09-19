import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MenuModel } from 'src/app/shared/models/menus/menu.model';
import { MenuState } from 'src/app/shared/state';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: [],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;

  asideBarMenus$: Observable<Array<MenuModel>>;
  constructor(private menuState: MenuState) { }

  ngOnInit(): void {
    this.asideBarMenus$ = this.menuState.asideBarMenus$;
    console.log(this.asideBarMenus$)
  }
}
