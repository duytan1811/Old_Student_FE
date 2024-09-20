import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentEditDialogComponent } from './components/student-edit-dialog/student-edit-dialog.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';


@NgModule({
  declarations: [
    StudentComponent,
    StudentEditDialogComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedComponentModule,
  ]
})
export class StudentModule { }
