import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { ClaimValue, CommonConstants } from 'src/app/shared/constants/common-constants';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { ContributeModel } from 'src/app/shared/models/contributes/contribute.model';
import * as state from 'src/app/shared/state';
import { ContributeSaveDialogComponent } from './components/contribute-save-dialog/contribute-save-dialog.component';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: []
})
export class ContributeComponent implements OnInit {
  public contributes$: Observable<Array<ContributeModel>>;
  public totalContribute$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public tableView$: Observable<BaseViewModel>;
  public formSearch: FormGroup;
  public statusEnum = StatusEnum;
  public statuses = CommonConstants.SearchStatus;
  public claimValue = ClaimValue;
  public drpContributeTypes$: Observable<Array<SelectListItem>>;

  constructor(
    private fb: FormBuilder,
    private flashMessageState: state.FlashMessageState,
    private contributeState: state.ContributeState,
    private viewState: state.ViewState,
    private dialog: MatDialog,
    private pageInfo: PageInfoService,
    private title: Title,
    private authState: state.AuthState,
    private drpState: state.DropdownState,
  ) { }

  ngOnInit(): void {
    this.pageInfo.updateTitle('Quản lý đóng góp');
    this.title.setTitle('Quản lý đóng góp');
    this.isLoading$ = this.contributeState.isLoading$;
    this.totalContribute$ = this.contributeState.totalContribute$;
    this.contributes$ = this.contributeState.contributes$;
    this.tableView$ = this.viewState.view$;
    this.drpContributeTypes$ = this.drpState.dropdownContributeTypes$;

    this.drpState.getDropdownContributeTypes();

    this.initFormSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();
    const dataSearch = this.formSearch.getRawValue();
    dataSearch.status = dataSearch.status !== '' ? parseInt(dataSearch.status) : null;
    dataSearch.type = dataSearch.type !== '' ? parseInt(dataSearch.type) : null;
    dataSearch.amount = dataSearch.amount !== '' ? parseFloat(dataSearch.amount) : null;
    viewState.searchParams = dataSearch;
    this.contributeState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.contributeState.search(viewState);
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
      ContributeSaveDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public goDelete(data: ContributeModel): void {
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
        const res = await this.contributeState.delete(data.id);
        this.flashMessageState.message(res.type, res.message);
      }
    });
  }

  public checkPermission(rule: string) {
    return this.authState.checkPermissionMenu(
      CommonConstants.MenuKey.Contribute,
      rule
    );
  }

  private initFormSearch() {
    this.formSearch = this.fb.group({
      fullName: [''],
      type: [''],
      amount: [''],
      status: [''],
    });

    this.onSearch();
  }
}
