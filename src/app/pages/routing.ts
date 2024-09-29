import { Routes } from '@angular/router';
import { EndPointConstants } from '../shared/constants/end-point-constants';

const Routing: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: EndPointConstants.Dashboard.Index,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: EndPointConstants.Role.Index,
    loadChildren: () =>
      import('../modules/role/role.module').then((m) => m.RoleModule),
  },
  {
    path: EndPointConstants.User.Index,
    loadChildren: () =>
      import('../modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: EndPointConstants.Student.Index,
    loadChildren: () =>
      import('../modules/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: EndPointConstants.Setting.Index,
    loadChildren: () =>
      import('../modules/setting/setting.module').then((m) => m.SettingModule),
  },
  {
    path: EndPointConstants.News.Index,
    loadChildren: () =>
      import('../modules/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: EndPointConstants.Forum.Index,
    loadChildren: () =>
      import('../modules/forum/forum.module').then((m) => m.ForumModule),
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
