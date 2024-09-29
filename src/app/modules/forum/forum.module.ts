import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-components.module';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { ForumComponent } from './forum.component';


@NgModule({
  declarations: [
    ForumComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    DirectiveModule,
    SharedComponentModule
  ]
})
export class ForumModule { }
