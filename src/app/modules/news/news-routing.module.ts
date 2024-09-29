import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';
import { NewsEditComponent } from './news-edit/news-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.News,
      action: ClaimValue.View,
    },
  },
  {
    path: ':id',
    component: NewsEditComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.News,
      action: ClaimValue.Edit,
    },
  },
  {
    path: 'create',
    component: NewsEditComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.News,
      action: ClaimValue.Create,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
