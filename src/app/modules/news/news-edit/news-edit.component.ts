import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';
import { NewsModel } from 'src/app/shared/models/news/news.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: [],
})
export class NewsEditComponent implements OnInit {
  public dropdownNewsTypes$: Observable<Array<SelectListItem>>;
  public news$: Observable<NewsModel>;

  public newsId: string | null = null;
  public ckEditor = ClassicEditorBuild;
  public formGroup: FormGroup;
  public formStatuses = CommonConstants.FormStatuses;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private dropdownState: state.DropdownState,
    private flashMessageState: state.FlashMessageState,
    private newsState: state.NewsState
  ) {}

  ngOnInit(): void {
    this.newsId = this.activeRoute.snapshot.paramMap.get('id');
    if (this.newsId === 'create') this.newsId = null;

    this.news$ = this.newsState.news$;

    this.dropdownNewsTypes$ = this.dropdownState.dropdownNewsTypes$;
    this.dropdownState.getDropdownNewTypes();

    setTimeout(() => {
      this.newsState.findById(this.newsId);
    }, 50);

    this.initFormGroup();
  }

  public async onSave() {
    const data = this.formGroup.getRawValue();
    data.type = parseInt(data.type);

    let res;
    if (this.newsId !== null) {
      res = await this.newsState.update(this.newsId, data);
    } else {
      res = await this.newsState.save(data);
    }
    this.flashMessageState.message(res.type, res.message);
    if (
      res.type === CommonConstants.ResponseType.Success &&
      this.newsId === null
    ) {
      this.formGroup.reset();
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      content: [''],
    });
  }
}
