import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { EventEditDialogComponent } from './components/event-edit-dialog/event-edit-dialog.component';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EventDetailComponent } from './components/event-detail/event-detail.component';


@NgModule({
  declarations: [
    EventComponent,
    EventEditDialogComponent,
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedComponentModule,
    CKEditorModule
  ]
})
export class EventModule { }
