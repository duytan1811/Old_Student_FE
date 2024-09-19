import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleSummaryComponent } from './components/role-summary/role-summary.component';
import { RoleComponent } from './role.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

const routes: Routes = [{
  path: '',
  component: RoleComponent,
  children: [
    {
      path: '',
      component: RoleSummaryComponent,
      canActivate: [PermissionGuard],
      data: { permission: CommonConstants.MENU_KEYS.Role, action: CommonConstants.PERMISSION.VIEW }
    },
    {
      path: ':id',
      component: RoleDetailComponent,
      canActivate: [PermissionGuard],
      data: { permission: CommonConstants.MENU_KEYS.Role, action: CommonConstants.PERMISSION.EDIT }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
