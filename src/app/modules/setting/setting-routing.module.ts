import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { SettingMajorComponent } from './setting-major/setting-major.component';
import { SettingRoleComponent } from './setting-role/setting-role.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    canActivate: [PermissionGuard],
  },
  {
    path: EndPointConstants.Major.Index,
    component: SettingMajorComponent,
    canActivate: [PermissionGuard],
  },
  {
    path: EndPointConstants.Role.Index,
    component: SettingRoleComponent,
    canActivate: [PermissionGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
