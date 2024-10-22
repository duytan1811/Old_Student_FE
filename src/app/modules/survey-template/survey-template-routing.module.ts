import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyTemplateComponent } from './survey-template.component';

const routes: Routes = [{
  path: '',
  component: SurveyTemplateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyTemplateRoutingModule { }
