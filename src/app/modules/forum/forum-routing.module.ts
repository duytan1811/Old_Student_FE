import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
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
export class ForumRoutingModule {}
