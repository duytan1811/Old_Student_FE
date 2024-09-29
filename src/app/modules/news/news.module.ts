import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    NewsComponent,
    NewsEditComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    DirectiveModule,
    SharedComponentModule,
    CKEditorModule
  ]
})
export class NewsModule { }
