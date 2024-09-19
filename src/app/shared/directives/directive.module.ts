import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectFormDirective } from './connect-form.directive';
import { FlexboxAlignmentDirective } from './flexbox-alignment.directive';

@NgModule({
  declarations: [
    ConnectFormDirective,
    FlexboxAlignmentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConnectFormDirective,
    FlexboxAlignmentDirective
  ]
})
export class DirectiveModule { }
