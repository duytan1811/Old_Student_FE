import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.Event,
      action: ClaimValue.View,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
