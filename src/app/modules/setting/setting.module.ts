import { NgModule } from '@angular/core';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import * as state from 'src/app/shared/state';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerScreenComponent } from 'src/app/shared/components/spinner-screen/spinner-screen.component';
import { SettingMajorComponent } from './setting-major/setting-major.component';
import { SettingMajorEditModalComponent } from './setting-major/components/setting-major-edit-modal/setting-major-edit-modal.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    SettingComponent,
    SettingMajorComponent,
    SettingMajorEditModalComponent,
    SpinnerScreenComponent,
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
