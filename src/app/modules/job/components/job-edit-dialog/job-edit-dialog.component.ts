import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { convertFileToBase64 } from 'src/app/shared/helper/common.helper';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { JobModel } from 'src/app/shared/models/jobs/job.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-job-edit-dialog',
  templateUrl: './job-edit-dialog.component.html',
  styleUrls: [],
})
export class JobEditDialogComponent implements OnInit {
  @ViewChild('skillTag') skillTag: ElementRef;
  public formGroup: FormGroup;
  public statuses = CommonConstants.FormStatuses;
  public jobId: string | null = null;
  public job$: Observable<JobModel>;
  public majorDropdown$: Observable<Array<SelectListItem>>;
  public ckEditor = ClassicEditorBuild;
  public skills: Array<string> = [];
  public workTypes= CommonConstants.WorkType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobState: state.JobState,
    private fb: FormBuilder,
    private commonState: state.CommonState,
    private dialogRef: MatDialogRef<JobEditDialogComponent>,
    private dropdownState: state.DropdownState
  ) {}

  ngOnInit(): void {
    this.jobId = this.data.jobId;
    this.job$ = this.jobState.job$;

    this.jobState.findById(this.jobId);

    this.job$.subscribe((res)=>{
      if(res){
        this.skills= res.skills;
      }
    })
    this.majorDropdown$ = this.dropdownState.dropdownMajors$;
    this.initFormGroup();
  }

  public onAddSkills(event: any) {
    this.skills.push(event.target.value);
    this.skillTag.nativeElement.value = '';
    setTimeout(() => {
      this.skillTag.nativeElement.focus();
    }, 0);
  }

  public onRemoveSkills(index: number) {
    this.skills.splice(index, 1);
  }

  public onChangeFileAttach(event: any) {
    const file = event.target.files[0];
    convertFileToBase64(file)
      .then((base64String) => {
        this.formGroup.get('fileName')?.setValue(file.name);
        this.formGroup.get('fileBase64')?.setValue(base64String);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openPdf(base64Pdf: string) {
    const blob = this.commonState.convertBase64ToBlob(
      base64Pdf,
      'application/pdf'
    );
    const url = URL.createObjectURL(blob);
    window.open(url);
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();

    data.status = data.status !== '' ? data.status : null;
    data.majorId = data.majorId !== '' ? data.majorId : null;
    data.skills = this.skills;

    let result = null;
    if (this.jobId != null) {
      result = await this.jobState.update(this.jobId, data);
    } else {
      result = await this.jobState.save(data);
    }
    if (result.type === CommonConstants.ResponseType.Success) {
      this.formGroup.reset();
      this.dialogRef.close();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      majorId: ['',Validators.required],
      companyName: ['', Validators.required],
      workType: ['', Validators.required],
      content: ['', Validators.required],
      startDateFormat: [''],
      endDateFormat: [''],
      fileBase64: [''],
      fileName: [''],
      status: [''],
    });
  }
}
