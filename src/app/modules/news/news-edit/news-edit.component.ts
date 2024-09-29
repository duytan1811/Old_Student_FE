import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: [],
})
export class NewsEditComponent implements OnInit {
  public newsId: string | null = null;
  public Editor = ClassicEditorBuild;
  
  constructor(private fn: FormBuilder, private activrRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
