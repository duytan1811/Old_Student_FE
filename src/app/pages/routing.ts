import { Routes } from '@angular/router';
import { EndPointConstants } from '../shared/constants/end-point-constants';

const Routing: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: EndPointConstants.Dashboard,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: EndPointConstants.Role,
    loadChildren: () =>
      import('../modules/role/role.module').then((m) => m.RoleModule),
  },
  {
    path: EndPointConstants.User,
    loadChildren: () =>
      import('../modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: EndPointConstants.Setting,
    loadChildren: () =>
      import('../modules/setting/setting.module').then((m) => m.SettingModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
