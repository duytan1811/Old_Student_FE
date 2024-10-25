import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentContributeModel, StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-contribute-detail',
  templateUrl: './contribute-detail.component.html',
  styleUrls: []
})
export class ContributeDetailComponent implements OnInit {
  public studentId: string;
  public studentName: string;
  public studentContributes$: Observable<Array<StudentContributeModel>>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentState: state.StudentState,
    private viewState: state.ViewState,
    private dialogRef: MatDialogRef<ContributeDetailComponent>
  ) { }

  ngOnInit(): void {
    this.studentContributes$ =
      this.studentState.contributes$;
    this.studentId = this.data.id;
    this.studentName = this.data.studentName;
    this.studentState.getContributes(this.studentId);
  }
}
