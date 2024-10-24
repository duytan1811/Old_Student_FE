import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeRoutingModule } from './contribute-routing.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { ContributeComponent } from './contribute.component';
import { ContributeSaveDialogComponent } from './components/contribute-save-dialog/contribute-save-dialog.component';


@NgModule({
  declarations: [
    ContributeComponent,
    ContributeSaveDialogComponent
  ],
  imports: [
    CommonModule,
    ContributeRoutingModule,
    SharedComponentModule
  ]
})
export class ContributeModule { }
