import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state'

@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrls: []
})
export class StudentOverviewComponent implements OnInit {
  @Input() student: StudentModel;
  public id: string;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
