import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { ForumComponent } from './forum.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { EditNewsDialogComponent } from './components/edit-news-dialog/edit-news-dialog.component';


@NgModule({
  declarations: [
    ForumComponent,
    EditNewsDialogComponent,
    EditNewsDialogComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    DirectiveModule,
    SharedComponentModule,
    CKEditorModule,
    PipesModule,
    CKEditorModule
  ]
})
export class ForumModule { }
