import { BaseModel } from "../base/base.model";
import { PermissionModel } from "../base/permission.model";

export class UserModel extends BaseModel {
  id: string;
  userName: string;
  password: string;
  email: string;
  avatar: string;
  phone: string;
  fullName: string;
  selected: boolean;
  isTeacher: boolean = false;
  studentId: string | null = null;
  menuPermissions: Array<PermissionModel> | null = null;

  constructor() {
    super();
    this.id = '';
    this.userName = '';
    this.password = '';
    this.email = '';
    this.avatar = './assets/media/avatars/blank.png';
    this.phone = '';
    this.selected = false;
  }

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.userName = user.userName || '';
    this.password = user.password || '';
    this.email = user.email || '';
    this.avatar = user.avatar || './assets/media/avatars/blank.png';
    this.phone = user.phone || '';
  }
}
