import { PermissionModel } from '../base/permission.model';

export class MenuModel {
  key: string = '';
  display: string = '';
  icon: string = '';
  href: string = '';
  expand: boolean = false;
  items: Array<MenuModel> | null = null;
  permission: PermissionModel = new PermissionModel();
}
