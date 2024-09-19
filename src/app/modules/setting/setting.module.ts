import { NgModule } from '@angular/core';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingGeneralComponent } from './components/setting-general/setting-general.component';
import { SettingComponent } from './setting.component';
import * as state from 'src/app/shared/state';
import { MatSelectModule } from '@angular/material/select';
import { SettingImageComponent } from './components/setting-image/setting-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerScreenComponent } from 'src/app/shared/components/spinner-screen/spinner-screen.component';
import { StatusBadgeComponent } from 'src/app/shared/components/status-badge/status-badge.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { SettingMajorComponent } from './components/setting-major/setting-major.component';
import { SettingMajorEditModalComponent } from './components/setting-major-edit-modal/setting-major-edit-modal.component';
import { SettingMajorImportModalComponent } from './components/setting-major-import-modal/setting-major-import-modal.component';


@NgModule({
  declarations: [
    SettingComponent,
    SettingGeneralComponent,
    SettingImageComponent,
    SettingMajorComponent,
    SettingMajorEditModalComponent,
    SettingMajorImportModalComponent,
    SpinnerScreenComponent,
  ],
  imports: [
    SettingRoutingModule,
    MatSelectModule,
    SharedComponentModule,
    MatDialogModule,
  ],
  exports:[StatusBadgeComponent],
  providers:[
    state.SettingState,
  ]
})
export class SettingModule { }
