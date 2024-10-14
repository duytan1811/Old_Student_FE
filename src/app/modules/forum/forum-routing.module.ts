import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import {
  ClaimValue,
  CommonConstants,
} from 'src/app/shared/constants/common-constants';
import { NewsListComponent } from './news-list/news-list.component';
import { JobListComponent } from './job-list/job-list.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
    children: [
      {
        path: 'news',
        component: NewsListComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: CommonConstants.MenuKey.Forum,
          action: ClaimValue.View,
        },
      },
      {
        path: 'event',
        component: EventListComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: CommonConstants.MenuKey.Forum,
          action: ClaimValue.View,
        },
      },
      {
        path: 'job',
        component: JobListComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: CommonConstants.MenuKey.Forum,
          action: ClaimValue.View,
        },
      },
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}
