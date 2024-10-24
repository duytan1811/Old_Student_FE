import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { ActionSurveyComponent } from './action-survey/action-survey.component';
import { SurveyResultComponent } from './survey-result/survey-result.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.Survey,
      action: ClaimValue.View,
    },
  },
  {
    path: 'actions',
    component: ActionSurveyComponent,
    data: {
      permission: CommonConstants.MenuKey.SurveyAction,
      action: ClaimValue.View,
    },
  },
  {
    path: ':id/results',
    component: SurveyResultComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: CommonConstants.MenuKey.Survey,
      action: ClaimValue.View,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyTemplateRoutingModule {}
