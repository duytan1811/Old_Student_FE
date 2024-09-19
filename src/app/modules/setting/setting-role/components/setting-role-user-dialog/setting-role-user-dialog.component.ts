import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RoleModel } from 'src/app/shared/models/roles/role.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-setting-role-user-dialog',
  templateUrl: './setting-role-user-dialog.component.html',
  styleUrls: [],
})
export class SettingRoleUserDialogComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  public role: RoleModel;
  public roles$: Observable<Array<RoleModel>>;
  public filteredOptions: RoleModel[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SettingRoleUserDialogComponent>,
    private roleState: state.RoleState
  ) {}

  ngOnInit(): void {
    this.role = this.data.role;
    this.roles$ = this.roleState.roles$;
  }

  public filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.roles$.subscribe((res) => {
      if (res) {
        this.filteredOptions = res.filter((o) =>
          o.name.toLowerCase().includes(filterValue)
        );
      }
    });
  }
}
