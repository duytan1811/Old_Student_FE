import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributeComponent } from './contribute.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';

const routes: Routes = [
  {
    path: '',
    component: ContributeComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.Forum,
      action: ClaimValue.View,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributeRoutingModule {}
