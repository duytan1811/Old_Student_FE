import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { JobEditDialogComponent } from './components/job-edit-dialog/job-edit-dialog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { JobRegisterDetailDialogComponent } from './components/job-register-detail-dialog/job-register-detail-dialog.component';


@NgModule({
  declarations: [
    JobComponent,
    JobEditDialogComponent,
    JobRegisterDetailDialogComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedComponentModule,
    DirectiveModule,
    CKEditorModule,
  ]
})
export class JobModule { }
