import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentEditComponent } from './student-detail/student-detail.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.Student,
      action: ClaimValue.View,
    },
  },
  {
    path: ':id',
    component: StudentEditComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.Student,
      action: ClaimValue.View,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
