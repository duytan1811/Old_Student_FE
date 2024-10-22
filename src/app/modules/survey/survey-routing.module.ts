import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { ActionSurveyComponent } from './action-survey/action-survey.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent,
  },
  {
    path: 'actions',
    component: ActionSurveyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyTemplateRoutingModule {}
