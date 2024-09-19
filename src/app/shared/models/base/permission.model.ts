export class PermissionModel {
  isView: boolean;
  isCreate: boolean;
  isEdit: boolean;
  isDelete: boolean;

  constructor() {
    this.isView = false;
    this.isCreate = false;
    this.isEdit = false;
    this.isDelete = false;
  }
}