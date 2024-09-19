import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingGeneralComponent } from './components/setting-general/setting-general.component';
import { SettingImageComponent } from './components/setting-image/setting-image.component';
import { SettingComponent } from './setting.component';
import { SettingMajorComponent } from './components/setting-major/setting-major.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    canActivate: [PermissionGuard],
    data: { permission: CommonConstants.MENU_KEYS.Setting, action: CommonConstants.PERMISSION.VIEW }
  },
  {
    path: EndPointConstants.General,
    component: SettingGeneralComponent,
    canActivate: [PermissionGuard],
    data: { permission: CommonConstants.MENU_KEYS.Setting, action: CommonConstants.PERMISSION.EDIT }
  },
  {
    path: EndPointConstants.Image,
    component: SettingImageComponent,
    canActivate: [PermissionGuard],
    data: { permission: CommonConstants.MENU_KEYS.Setting, action: CommonConstants.PERMISSION.EDIT }
  },
  {
    path: EndPointConstants.Major,
    component: SettingMajorComponent,
    canActivate: [PermissionGuard],
    data: { permission: CommonConstants.MENU_KEYS.Setting, action: CommonConstants.PERMISSION.EDIT }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
