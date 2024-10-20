import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { ProfileComponent } from './profile.component';
import { StudentAchievementComponent } from '../student/student-achievement/student-achievement.component';
import { StudentSettingComponent } from '../student/student-setting/student-setting.component';
import { StudentOverviewComponent } from '../student/student-overview/student-overview.component';
import { StudentAchievementEditDialogComponent } from '../student/student-achievement/components/student-achievement-edit-dialog/student-achievement-edit-dialog.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { ProfileAchievementComponent } from './components/profile-achievement/profile-achievement.component';
import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';
import { ChangePasswordComponent } from '../auth/components/change-password/change-password.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileOverviewComponent,
    ProfileAchievementComponent,
    ProfileSettingComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedComponentModule,
  ]
})
export class ProfileModule { }
