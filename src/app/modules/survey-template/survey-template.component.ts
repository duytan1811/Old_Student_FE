import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { SurveyTemplateModel } from 'src/app/shared/models/survey-templates/survey-template.mode';
import * as state from 'src/app/shared/state';
import { SurveyTemplateEditDialogComponent } from './components/survey-template-edit-dialog/survey-template-edit-dialog.component';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-survey-template',
  templateUrl: './survey-template.component.html',
  styleUrls: []
})
export class SurveyTemplateComponent implements OnInit {
  public surveyTemplates$: Observable<Array<SurveyTemplateModel>>;
  public totalSurveyTemplate$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public tableView$: Observable<BaseViewModel>;
  public formSearch: FormGroup;
  public statusEnum = StatusEnum;
  public statuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;

  constructor(
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private surveyTemplateState: state.SurveyTemplateState,
    private viewState: state.ViewState,
    private dialog: MatDialog,
    private pageInfo: PageInfoService,
    private title: Title,
    private authState: state.AuthState
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Mẫu khảo sát');
    this.title.setTitle('Mẫu khảo sát');
    this.isLoading$ = this.surveyTemplateState.isLoading$;
    this.totalSurveyTemplate$ = this.surveyTemplateState.totalSurveyTemplate$;
    this.surveyTemplates$ = this.surveyTemplateState.surveyTemplates$;
    this.tableView$ = this.viewState.view$;

    this.initFormSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? dataSearch.status : null;
    viewState.searchParams = dataSearch;
    this.viewState.setViewState(viewState);
    this.surveyTemplateState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.surveyTemplateState.search(viewState);
  }

  public goEdit(id: string | null, isCreate: boolean = true): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id,
      isCreate,
    };
    const dialogRef = this.dialog.open(
      SurveyTemplateEditDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public goDelete(data: SurveyTemplateModel): void {
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
        const res = await this.surveyTemplateState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MenuKey.SurveyTemplate,
      rule
    );
  }

  private initFormSearch() {
    this.formSearch = this.fb.group({
      name: [''],
      status: [''],
    });

    this.onSearch();
  }
}
