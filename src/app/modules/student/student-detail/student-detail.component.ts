import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { StudentConstants } from 'src/app/shared/constants/student.constants';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: []
})
export class StudentEditComponent implements OnInit {

  public formGroup: FormGroup;
  public student$: Observable<StudentModel>;
  public isLoading$: Observable<boolean>;
  public studentTabs = StudentConstants.Tabs;
  public tabSelected: string = 'overview';

  public id: string;

  constructor(
    private studentState: state.StudentState,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private pageInfo: PageInfoService,
    private title: Title,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.title.setTitle('Thông tin sinh viên');
    this.pageInfo.updateTitle('Thông tin sinh viên');
    this.activeRouter.params.subscribe(res => {
      this.id = res.id;
      this.studentState.findById(this.id);
    })

    this.activeRouter.queryParams.subscribe(res => {
      if (res && res.tab) {
        this.tabSelected = res.tab;
      }
      this.onChangeTab(this.tabSelected);
    })

    this.student$ = this.studentState.student$;
    this.isLoading$ = this.studentState.isLoading$;

    this.initFormGroup();
  }

  public onSave() { }

  public onChangeTab(key: string) {
    this.tabSelected = key;
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      status: [null],
    });
  }
}
