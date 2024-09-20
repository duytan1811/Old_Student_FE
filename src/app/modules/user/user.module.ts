import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserSummaryComponent } from './components/user-summary/user-summary.component';
import { MatSelectModule } from '@angular/material/select';
import { UserComponent } from './user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditModalComponent } from './components/user-edit-modal/user-edit-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';


@NgModule({
  declarations: [
    UserComponent,
    UserSummaryComponent,
    UserDetailComponent,
    UserEditModalComponent,
  ],
  imports: [
    UserRoutingModule,
    MatSelectModule,
    SharedComponentModule,
    MatDialogModule,
    MatCheckboxModule,
  ]
})
export class UserModule { }
