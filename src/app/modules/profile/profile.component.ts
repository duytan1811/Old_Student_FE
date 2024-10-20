import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ProfileConstants } from 'src/app/shared/constants/student.constants';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {
  public formGroup: FormGroup;
  public user$: Observable<UserModel>;
  public student$: Observable<StudentModel>;
  public isLoading$: Observable<boolean>;
  public studentTabs = ProfileConstants.Tabs;
  public tabSelected: string = 'overview';

  constructor(
    private studentState: state.StudentState,
    private authState: state.AuthState,
    private router: Router,
    private pageInfo: PageInfoService,
    private title: Title,
    private fb: FormBuilder,
    private activeRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pageInfo.updateTitle('Thông tin tài khoản');
    this.title.setTitle('Thông tin tài khoản');
    this.isLoading$ = this.studentState.isLoading$;
    this.user$ = this.authState.currentUser$;

    this.student$ = this.studentState.student$;
    this.user$.subscribe((res: any) => {
      if (res && !res.isAdmin) {
        this.studentState.findById(res.studentId);
      }
    })

    this.activeRouter.queryParams.subscribe(res => {
      if (res && res.tab) {
        this.tabSelected = res.tab;
      }
      this.onChangeTab(this.tabSelected);
    })
  }

  public onChangeTab(key: string) {
    this.tabSelected = key;
  }
}
