import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-role-user-modal',
  templateUrl: './role-user-modal.component.html',
  styleUrls: [],
})
export class RoleUserModalComponent implements OnInit {
  @ViewChild('userSelect') userSelect: MatSelect;
  public roleId: string;
  public isLoading$: Observable<boolean>;
  public dropdownUsers$: Observable<Array<SelectListItem>>;
  public dataSelectUsers: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RoleUserModalComponent>,
    private dropdownState: state.DropdownState,
    private roleState: state.RoleState,
    private flashMessageState: state.FlashMessageState
  ) {}

  ngOnInit(): void {
    this.roleId = this.data.roleId;
    this.dropdownState.getDropdownUsers();
    this.dropdownUsers$ = this.dropdownState.dropdownUsers$;
  }

  public onApply() {
    this.userSelect.options.forEach((option) => {
      if (option.selected) {
        this.dataSelectUsers.push({
          id: option.value,
          userName: option.getLabel(),
        });
      }
    });
    this.userSelect.value = null;
  }

  public onDeleteSelectUser(id: string) {
    this.dataSelectUsers.splice(
      this.dataSelectUsers.find((i: any) => i.id === id),
      1
    );
  }

  public async onSave() {
    var selectedUserIds = this.dataSelectUsers.map((item: any) => item.id);
    const result = await this.roleState.saveUserByRole(
      this.roleId,
      selectedUserIds
    );

    this.flashMessageState.message(result.type, result.message);
    if (result.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }
}
