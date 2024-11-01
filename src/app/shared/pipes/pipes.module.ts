import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currency,pipe';
import { DateAgoPipe } from './date-ago.pipe';
import { SanitizerUrlPipe } from './sanitizerUrl.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    DateAgoPipe,
    SanitizerUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyPipe,
    DateAgoPipe,
    SanitizerUrlPipe
  ]
})
export class PipesModule {
}
