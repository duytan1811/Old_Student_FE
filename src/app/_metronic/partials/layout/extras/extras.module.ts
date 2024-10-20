import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { UserInnerComponent } from './dropdown-inner/user-inner/user-inner.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';
import { TranslationModule } from 'src/app/modules/i18n';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UserInnerComponent,
    LayoutScrollTopComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    RouterModule,
    TranslationModule,
    NgbTooltipModule,
  ],
  exports: [
    UserInnerComponent,
    LayoutScrollTopComponent,
  ],
})
export class ExtrasModule {
}
