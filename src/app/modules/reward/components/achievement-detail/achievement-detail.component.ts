import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentAchievementModel } from 'src/app/shared/models/student-achivements/student-achievement.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-achievement-detail',
  templateUrl: './achievement-detail.component.html',
  styleUrls: []
})
export class AchievementDetailComponent implements OnInit {
  public studentId: string;
  public studentName: string;
  public studentAchievements$: Observable<Array<StudentAchievementModel>>;
  public totalStudentAchievement$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentAchievementState: state.StudentAchievementState,
    private viewState: state.ViewState,
    private dialogRef: MatDialogRef<AchievementDetailComponent>
  ) { }

  ngOnInit(): void {
    this.studentAchievements$ =
      this.studentAchievementState.studentAchievements$;
    this.totalStudentAchievement$ = this.studentAchievementState.totalStudentAchievement$;
    this.studentId = this.data.id;
    this.studentName = this.data.studentName;
    if (this.studentId) {
      this.onSearch();
    }
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = {
      studentId: this.studentId
    };
    viewState.searchParams = dataSearch;
    viewState.paginator.pageSize = 99999999;
    this.viewState.setViewState(viewState);
    this.studentAchievementState.search(viewState);
  }
}
