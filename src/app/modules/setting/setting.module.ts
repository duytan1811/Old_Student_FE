import { NgModule } from '@angular/core';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import * as state from 'src/app/shared/state';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerScreenComponent } from 'src/app/shared/components/spinner-screen/spinner-screen.component';
import { SettingMajorComponent } from './setting-major/setting-major.component';
import { SettingMajorEditModalComponent } from './setting-major/components/setting-major-edit-modal/setting-major-edit-modal.component';
import { SettingMajorImportModalComponent } from './setting-major/components/setting-major-import-modal/setting-major-import-modal.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { SettingRoleComponent } from './setting-role/setting-role.component';
import { SettingRoleEditDialogComponent } from './setting-role/components/setting-role-edit-dialog/setting-role-edit-dialog.component';
import { SettingRoleUserDialogComponent } from './setting-role/components/setting-role-user-dialog/setting-role-user-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    SettingComponent,
    SettingMajorComponent,
    SettingMajorEditModalComponent,
    SettingMajorImportModalComponent,
    SpinnerScreenComponent,
    SettingRoleComponent,
    SettingRoleEditDialogComponent,
    SettingRoleUserDialogComponent,
  ],
  imports: [
    SettingRoutingModule,
    MatDialogModule,
    SharedComponentModule,
    MatAutocompleteModule
  ],
  exports: [],
  providers: [state.SettingState],
})
export class SettingModule {}
