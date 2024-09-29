import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentAchievementModel } from 'src/app/shared/models/student-achivements/student-achievement.model';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';
import { StudentAchievementEditDialogComponent } from './components/student-achievement-edit-dialog/student-achievement-edit-dialog.component';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-student-achievement',
  templateUrl: './student-achievement.component.html',
  styleUrls: [],
})
export class StudentAchievementComponent implements OnInit {
  @Input() student: StudentModel;
  public studentAchievements$: Observable<Array<StudentAchievementModel>>;
  public id: string;

  constructor(
    private studentAchievementState: state.StudentAchievementState,
    private studentState: state.StudentState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState
  ) {}

  ngOnInit(): void {
    this.studentAchievementState.search({ studentId: this.id });
    this.studentAchievements$ =
      this.studentAchievementState.studentAchievements$;
  }

  public onEdit(id: string | null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      studentId: this.student.id,
      id: id,
    };
    const dialogRef = this.dialog.open(
      StudentAchievementEditDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(async (result) => {
        this.studentState.findById(this.student.id);
    });
  }

  public onCreate() {
    this.onEdit(null);
  }

  public goDelete(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
    };
    const dialogRef = this.dialog.open(
      ConfirmDeleteModalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const res = await this.studentAchievementState.delete(id);
        this.flashMessageState.message(res.type, res.message);
        this.studentAchievementState.search({ studentId: this.id });
        this.studentState.findById(this.student.id);
      }
    });
  }
}
