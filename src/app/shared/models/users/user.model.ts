import { BaseModel } from "../base/base.model";
import { PermissionModel } from "../base/permission.model";

export class UserModel extends BaseModel {
  id: string;
  userName: string;
  password: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  fullName: string;
  selected: boolean;
  isTeacher:boolean=false;
  menuPermissions: Array<PermissionModel> | null = null;

  constructor() {
    super();
    this.id = '';
    this.userName = '';
    this.password = '';
    this.name = '';
    this.email = '';
    this.avatar = './assets/media/avatars/300-1.jpg';
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
    this.phone = user.phone || '';
  }
}
