import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { SettingMajorComponent } from './setting-major/setting-major.component';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: 'general',
        component: SettingComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: CommonConstants.MenuKey.Setting,
          action: ClaimValue.View,
        },
      },
      {
        path: EndPointConstants.Major.Index,
        component: SettingMajorComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: CommonConstants.MenuKey.Major,
          action: ClaimValue.View,
        },
      },
      { path: '', redirectTo: 'general', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
