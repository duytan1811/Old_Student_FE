import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyTemplateRoutingModule } from './survey-routing.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { SurveyComponent } from './survey.component';
import { SurveyEditDialogComponent } from './components/survey-template-edit-dialog/survey-edit-dialog.component';
import { ActionSurveyComponent } from './action-survey/action-survey.component';
import { SubmitSurveyDialogComponent } from './submit-survey-dialog/submit-survey-dialog.component';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyEditDialogComponent,
    ActionSurveyComponent,
    SubmitSurveyDialogComponent
  ],
  imports: [
    CommonModule,
    SurveyTemplateRoutingModule,
    SharedComponentModule,
  ]
})
export class SurveyModule { }
