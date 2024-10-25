import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardRoutingModule } from './reward-routing.module';
import { RewardComponent } from './reward.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { AchievementDetailComponent } from './components/achievement-detail/achievement-detail.component';
import { ContributeDetailComponent } from './components/contribute-detail/contribute-detail.component';


@NgModule({
  declarations: [
    RewardComponent,
    AchievementDetailComponent,
    ContributeDetailComponent
  ],
  imports: [
    CommonModule,
    RewardRoutingModule,
    SharedComponentModule
  ]
})
export class RewardModule { }
