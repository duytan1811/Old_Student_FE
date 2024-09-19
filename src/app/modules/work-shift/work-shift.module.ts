import { NgModule } from '@angular/core';

import { WorkShiftRoutingModule } from './work-shift-routing.module';
import { WorkShiftSummaryComponent } from './components/work-shift-summary/work-shift-summary.component';
import { WorkShiftComponent } from './work-shift.component';
import { WorkShiftEditModalComponent } from './components/work-shift-edit-modal/work-shift-edit-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';


@NgModule({
  declarations: [
    WorkShiftComponent,
    WorkShiftSummaryComponent,
    WorkShiftEditModalComponent
  ],
  imports: [
    WorkShiftRoutingModule,
    MatSelectModule,
    SharedComponentModule,
    MatDialogModule,
  ]
})
export class WorkShiftModule { }
