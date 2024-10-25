import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { StatisticsEventComponent } from './statistics-event/statistics-event.component';
import { StatisticsNewsComponent } from './statistics-news/statistics-news.component';
import { StatisticsMemberComponent } from './statistics-member/statistics-member.component';

const routes: Routes = [{
  path:'',
  component:StatisticsComponent,
  children:[
    {
      path:'members',
      component:StatisticsMemberComponent
    },
    {
      path:'events',
      component:StatisticsEventComponent
    },
    {
      path:'news',
      component:StatisticsNewsComponent
    },
    { path: '', redirectTo: 'members', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
