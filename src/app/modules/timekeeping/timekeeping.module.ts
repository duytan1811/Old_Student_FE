import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimekeepingRoutingModule } from './timekeeping-routing.module';
import { TimekeepingComponent } from './timekeeping.component';
import { TimeKeepingSummaryComponent } from './components/time-keeping-summary/time-keeping-summary.component';


@NgModule({
  declarations: [
    TimekeepingComponent,
    TimeKeepingSummaryComponent
  ],
  imports: [
    CommonModule,
    TimekeepingRoutingModule,
  ]
})
export class TimekeepingModule { }
