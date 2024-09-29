import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-student-setting',
  templateUrl: './student-setting.component.html',
  styleUrls: [],
})
export class StudentSettingComponent implements OnInit {
  @Input() student: StudentModel;
  public majorDropdownList$: Observable<Array<SelectListItem>>;
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dropDownState: state.DropdownState,
    private flashMessageState: state.FlashMessageState,
    private studentState: state.StudentState
  ) {}

  ngOnInit(): void {
    this.majorDropdownList$ = this.dropDownState.dropdownMajors$;
    this.dropDownState.getDropdownMajors();
    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();

    const result = await this.studentState.update(this.student.id, data);

    this.flashMessageState.message(result.type, result.message);
    if (result.type === CommonConstants.ResponseType.Success) {
      this.studentState.findById(this.student.id);
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      majorId: [''],
      fullName: ['', [Validators.required]],
      birthdayFormat: [''],
      gender: [''],
      avatar: [''],
      email: [''],
      phone: [''],
      schoolYear: [''],
      yearOfGraduation: [''],
      currentCompany: [''],
      jobTitle: [''],
    });
  }
}
