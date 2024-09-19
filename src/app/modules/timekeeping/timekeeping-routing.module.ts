import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimekeepingComponent } from './timekeeping.component';
import { TimeKeepingSummaryComponent } from './components/time-keeping-summary/time-keeping-summary.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

const routes: Routes = [
  {
    path: '',
    component: TimekeepingComponent,
    children: [
      {
        path: '',
        component: TimeKeepingSummaryComponent,
        canActivate: [PermissionGuard],
        data: { permission: CommonConstants.MENU_KEYS.TimeKeeping, action: CommonConstants.PERMISSION.VIEW }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimekeepingRoutingModule { }
