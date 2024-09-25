import { BaseModel } from "../base/base.model";
import { PermissionModel } from "../base/permission.model";

export class RoleModel extends BaseModel {

  code: string;
  name: string;
  countUsers: number;
  menuPermissions: Array<PermissionModel> = [];

  constructor() {
    super();
    this.code = '';
    this.name = '';
    this.countUsers = 0;
  }
}