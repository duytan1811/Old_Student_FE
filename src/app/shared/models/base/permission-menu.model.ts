import { PermissionModel } from "./permission.model";

export class PermissionMenuModel {
  menuKey: string;
  permission: PermissionModel;

  constructor() {
    this.menuKey = '';
    this.permission = new PermissionModel();
  }
}