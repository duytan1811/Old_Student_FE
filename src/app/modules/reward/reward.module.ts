import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardRoutingModule } from './reward-routing.module';
import { RewardComponent } from './reward.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';


@NgModule({
  declarations: [
    RewardComponent
  ],
  imports: [
    CommonModule,
    RewardRoutingModule,
    SharedComponentModule
  ]
})
export class RewardModule { }
