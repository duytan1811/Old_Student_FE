import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';
import { ContributeDetailComponent } from './components/contribute-detail/contribute-detail.component';
import { AchievementDetailComponent } from './components/achievement-detail/achievement-detail.component';
@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: []
})
export class RewardComponent implements OnInit {
  public students$: Observable<Array<StudentModel>>;
  public isLoading$: Observable<boolean>;
  public totalStudent$: Observable<number>;
  public userView$: Observable<BaseViewModel>;

  constructor(
    private viewState: state.ViewState,
    private studentState: state.StudentState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
    private title: Title,
    private pageInfo: PageInfoService,
    private router: Router,
    private dropdownState: state.DropdownState,
    private authState: state.AuthState
  ) { }

  ngOnInit(): void {
    this.pageInfo.updateTitle('Khen thưởng');
    this.title.setTitle('Khen thưởng');
    this.isLoading$ = this.studentState.isLoading$;
    this.students$ = this.studentState.students$;
    this.totalStudent$ = this.studentState.totalStudent$;
    this.userView$ = this.viewState.view$;
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    this.studentState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.studentState.search(viewState);
  }

  public goAchievementDetail(id: string, name: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id: id,
      studentName: name,
    };
    const dialogRef = this.dialog.open(
      AchievementDetailComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public goContributeDetail(id: string, name: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id: id,
      studentName: name,
    };
    const dialogRef = this.dialog.open(
      ContributeDetailComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => { });
  }
}
