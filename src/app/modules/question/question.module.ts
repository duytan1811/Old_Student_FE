import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { QuestionComponent } from './question.component';
import { QuestionEditDialogComponent } from './components/question-edit-dialog/question-edit-dialog.component';


@NgModule({
  declarations: [
    QuestionComponent,
    QuestionEditDialogComponent,
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    SharedComponentModule,
  ]
})
export class QuestionModule { }
