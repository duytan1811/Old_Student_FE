import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentAchievementEditDialogComponent } from 'src/app/modules/student/student-achievement/components/student-achievement-edit-dialog/student-achievement-edit-dialog.component';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { StudentAchievementModel } from 'src/app/shared/models/student-achivements/student-achievement.model';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-profile-achievement',
  templateUrl: './profile-achievement.component.html',
  styleUrls: []
})
export class ProfileAchievementComponent implements OnInit {
  @Input() studentId: string | null;
  public student$: Observable<StudentModel>;
  public studentAchievements$: Observable<Array<StudentAchievementModel>>;

  constructor(
    private studentAchievementState: state.StudentAchievementState,
    private studentState: state.StudentState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState
  ) { }

  ngOnInit(): void {
    this.student$ = this.studentState.student$;
    this.studentState.findById(this.studentId);

    this.studentAchievementState.search({ studentId: this.studentId });
    this.studentAchievements$ =
      this.studentAchievementState.studentAchievements$;
  }
  public onEdit(id: string | null) {
    if (this.studentId) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '40%';
      dialogConfig.data = {
        studentId: this.studentId,
        id: id,
      };
      const dialogRef = this.dialog.open(
        StudentAchievementEditDialogComponent,
        dialogConfig
      );
      dialogRef.afterClosed().subscribe(async (result) => {
        this.studentState.findById(this.studentId);
      });
    }
  }

  public onCreate() {
    this.onEdit(null);
  }

  public goDelete(id: string): void {
    if (this.studentId) {
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
          this.studentAchievementState.search({ studentId: this.studentId });
          this.studentState.findById(this.studentId);
        }
      });
    }
  }

}
