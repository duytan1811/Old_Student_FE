import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-edit-news-dialog',
  templateUrl: './edit-news-dialog.component.html',
  styleUrls: [],
})
export class EditNewsDialogComponent implements OnInit, AfterViewChecked {
  public currentUser$: Observable<UserModel>;
  public formGroup: FormGroup;
  public ckEditor = ClassicEditorBuild;
  public dropdownNewsTypes$: Observable<Array<SelectListItem>>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditNewsDialogComponent>,
    public authState: state.AuthState,
    private dropdownState: state.DropdownState,
    private newState: state.NewsState,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authState.currentUser$;
    this.initFormGroup();
    this.dropdownNewsTypes$ = this.dropdownState.dropdownNewsTypes$;
    this.dropdownState.getDropdownNewTypes();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    data.type = parseInt(data.type);

    const result = await this.newState.save(data);
    if (result.type === CommonConstants.ResponseType.Success) {
      this.formGroup.reset();
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      content: ['',[Validators.required]],
      type: [''],
    });
  }
}
