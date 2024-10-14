import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsMemberComponent } from './statistics-member/statistics-member.component';
import { StatisticsEventComponent } from './statistics-event/statistics-event.component';
import { StatisticsNewsComponent } from './statistics-news/statistics-news.component';
import { StatisticsComponent } from './statistics.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsMemberComponent,
    StatisticsEventComponent,
    StatisticsNewsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedComponentModule,
    NgApexchartsModule
  ]
})
export class StatisticsModule { }
