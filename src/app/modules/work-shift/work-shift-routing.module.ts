import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkShiftComponent } from './work-shift.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { WorkShiftSummaryComponent } from './components/work-shift-summary/work-shift-summary.component';

const routes: Routes = [
  {
    path: '',
    component: WorkShiftComponent,
    children: [
      {
        path: '',
        component: WorkShiftSummaryComponent,
        canActivate: [PermissionGuard],
        data: { permission: CommonConstants.MENU_KEYS.WorkShift, action: CommonConstants.PERMISSION.VIEW }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkShiftRoutingModule { }
