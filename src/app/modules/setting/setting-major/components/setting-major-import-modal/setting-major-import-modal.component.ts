import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-setting-major-import-modal',
  templateUrl: './setting-major-import-modal.component.html',
  styleUrls: []
})
export class SettingMajorImportModalComponent implements OnInit, OnDestroy {

  public isLoading$: Observable<boolean>;
  public fileName: string = '';
  public file: File;

  private subs: Subscription[] = [];

  constructor(private majorState: state.MajorState,
    private commonState: state.CommonState,
    private flashMessageState: state.FlashMessageState,
    private dialogRef: MatDialogRef<SettingMajorImportModalComponent>) { }

  ngOnInit(): void {
    this.isLoading$ = this.majorState.isLoading$;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public async onSubmit() {
    var formData = new FormData();
    formData.append('file', this.file);

    const res = await this.majorState.import(formData);
    this.flashMessageState.message(res.type,res.message);
    if (res.type === CommonConstants.ResponseType.Success) {
      this.dialogRef.close();
    }
  }

  public async onExportTemplate() {
    const result = await this.majorState.exportTemplate();
    const fileName = "Table_Template.xlsx";
    this.commonState.convertBase64ToFile(result.data, fileName, FileConstants.XLSX);
  }

  public onChangeImportFile(event: any) {
    const selectedFile = event.target.files[0];
    this.fileName = selectedFile.name;
    this.file = selectedFile;
  }
}
