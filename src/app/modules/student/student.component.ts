import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';
import { StudentEditDialogComponent } from './components/student-edit-dialog/student-edit-dialog.component';
import { Title } from '@angular/platform-browser';
import { PageInfoService } from 'src/app/_metronic/layout';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: [],
})
export class StudentComponent implements OnInit {
  public students$: Observable<Array<StudentModel>>;
  public dropwdownMajors$: Observable<Array<SelectListItem>>;
  public isLoading$: Observable<boolean>;
  public totalStudent$: Observable<number>;
  public userView$: Observable<BaseViewModel>;
  public formGroupSearch: FormGroup;
  public searchStatuses = CommonConstants.SearchStatus;

  constructor(
    private fb: FormBuilder,
    private viewState: state.ViewState,
    private studentState: state.StudentState,
    private dialog: MatDialog,
    private flashMessageState: state.FlashMessageState,
    private title: Title,
    private pageInfo: PageInfoService,
    private authState: state.AuthState,
    private dropdownState: state.DropdownState
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Danh sách sinh viên');
    this.title.setTitle('Danh sách sinh viên');
    this.isLoading$ = this.studentState.isLoading$;
    this.students$ = this.studentState.students$;
    this.totalStudent$ = this.studentState.totalStudent$;
    this.userView$ = this.viewState.view$;

    this.dropwdownMajors$ = this.dropdownState.dropdownMajors$;
    this.dropdownState.getDropdownMajors();
    this.initFormGroupSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formGroupSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.studentState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.studentState.search(viewState);
  }

  public goEdit(id: string | null, isCreate: boolean = true) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
      id,
      isCreate,
    };
    const dialogRef = this.dialog.open(
      StudentEditDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
      }
    });
  }

  public goDelete(data: StudentModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: data.id,
    };
    const dialogRef = this.dialog.open(
      ConfirmDeleteModalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const res = await this.studentState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
        const viewState = this.viewState.getViewState();
        this.studentState.search(viewState);
      }
    });
  }

  private initFormGroupSearch() {
    this.formGroupSearch = this.fb.group({
      fullName: [''],
      email: [''],
      majorId: [''],
      status: [''],
    });
  }
}
