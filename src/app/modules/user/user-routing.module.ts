import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserSummaryComponent } from './components/user-summary/user-summary.component';
import { UserComponent } from './user.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserSummaryComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':id',
        component: UserDetailComponent,
        canActivate: [PermissionGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
