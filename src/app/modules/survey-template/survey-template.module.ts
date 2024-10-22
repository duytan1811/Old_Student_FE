import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyTemplateRoutingModule } from './survey-template-routing.module';
import { SurveyTemplateEditDialogComponent } from './components/survey-template-edit-dialog/survey-template-edit-dialog.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { SurveyTemplateComponent } from './survey-template.component';


@NgModule({
  declarations: [
    SurveyTemplateComponent,
    SurveyTemplateEditDialogComponent
  ],
  imports: [
    CommonModule,
    SurveyTemplateRoutingModule,
    SharedComponentModule,
  ]
})
export class SurveyTemplateModule { }
