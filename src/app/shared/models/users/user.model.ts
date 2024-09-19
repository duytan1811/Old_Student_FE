import { BaseModel } from "../base/base.model";
import { PermissionMenuModel } from "../base/permission-menu.model";

export class UserModel extends BaseModel {
  id: string;
  userName: string;
  password: string;
  name: string;
  email: string;
  avatar: string;
  permissionMenus: PermissionMenuModel[] = [];
  phone: string;
  firstname: string;
  lastname: string;
  selected: boolean;

  constructor() {
    super();
    this.id = '';
    this.userName = '';
    this.password = '';
    this.name = '';
    this.email = '';
    this.avatar = './assets/media/avatars/300-1.jpg';
    this.permissionMenus = [];
    this.phone = '';
    this.selected = false;
  }

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.userName = user.userName || '';
    this.password = user.password || '';
    this.name = user.name || '';
    this.email = user.email || '';
    this.avatar = user.avatar || './assets/media/avatars/300-1.jpg';
    this.permissionMenus = user.permissionMenus || [];
    this.phone = user.phone || '';
  }
}
