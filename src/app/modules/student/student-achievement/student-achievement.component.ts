import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentAchievementModel } from 'src/app/shared/models/student-achivements/student-achievement.model';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';
import { StudentAchievementEditDialogComponent } from './components/student-achievement-edit-dialog/student-achievement-edit-dialog.component';

@Component({
  selector: 'app-student-achievement',
  templateUrl: './student-achievement.component.html',
  styleUrls: []
})
export class StudentAchievementComponent implements OnInit {
  @Input() student: StudentModel;
  public studentAchievements$: Observable<Array<StudentAchievementModel>>;
  public id: string;

  constructor(
    private studentAState: state.StudentAchievementState,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.studentAState.search({ studentId: this.id });

    this.studentAchievements$ = this.studentAState.studentAchievements$;
  }

  public onEdit(id:string| null){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      id,
    };
    const dialogRef = this.dialog.open(StudentAchievementEditDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
      }
    });
  }
  public onCreate(){
    this.onEdit(null);
  }

}
