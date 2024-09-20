import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoleEditModalComponent } from '../role-edit-modal/role-edit-modal.component';
import * as state from 'src/app/shared/state';
import { Observable } from 'rxjs';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-role-summary',
  templateUrl: './role-summary.component.html',
  styleUrls: []
})
export class RoleSummaryComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public roles$: Observable<Array<RoleModel>>;
  public totalRole$: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private viewState: state.ViewState,
    private roleState: state.RoleState,
    private flashMessageState: state.FlashMessageState,
  ) { }

  ngOnInit(): void {
    this.roles$ = this.roleState.roles$;
    this.totalRole$ = this.roleState.totalRole$;
    this.isLoading$ = this.roleState.isLoading$;
  }

  public goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      id, isCreate
    };
    const dialogRef = this.dialog.open(RoleEditModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public goDelete(data: RoleModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: data.id,
    };
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const res = await this.roleState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
      }
    });
  }
}
