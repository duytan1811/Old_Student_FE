import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentEditComponent } from './student-detail/student-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
  {
    path: ':id',
    component: StudentEditComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }
