import { BaseModel } from "../base/base.model";
import { MenuModel } from "../menus/menu.model";

export class RoleModel extends BaseModel {

  code: string;
  name: string;
  countUsers: number;
  permissionMenus: Array<MenuModel>;
  permissionMenusString: Array<string>;

  constructor() {
    super();
    this.code = '';
    this.name = '';
    this.countUsers = 0;
    this.permissionMenus = [];
    this.permissionMenusString = [];
  }
}