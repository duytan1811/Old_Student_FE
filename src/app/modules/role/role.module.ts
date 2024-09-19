import { NgModule } from '@angular/core';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { MatSelectModule } from '@angular/material/select';
import { RoleSummaryComponent } from './components/role-summary/role-summary.component';
import { RoleEditModalComponent } from './components/role-edit-modal/role-edit-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleUserModalComponent } from './components/role-user-modal/role-user-modal.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';


@NgModule({
  declarations: [
    RoleComponent,
    RoleSummaryComponent,
    RoleEditModalComponent,
    RoleDetailComponent,
    RoleUserModalComponent
  ],
  imports: [
    RoleRoutingModule,
    SharedComponentModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule
  ]
})
export class RoleModule { }
