import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentEditComponent } from './student-detail/student-detail.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentAchievementComponent } from './student-achievement/student-achievement.component';
import { StudentSettingComponent } from './student-setting/student-setting.component';
import { StudentOverviewComponent } from './student-overview/student-overview.component';
import { StudentAchievementEditDialogComponent } from './student-achievement/components/student-achievement-edit-dialog/student-achievement-edit-dialog.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentEditComponent,
    StudentAchievementComponent,
    StudentSettingComponent,
    StudentOverviewComponent,
    StudentAchievementEditDialogComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedComponentModule,
  ]
})
export class StudentModule { }
