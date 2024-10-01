import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currency,pipe';
import { DateAgoPipe } from './date-ago.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    DateAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyPipe,
    DateAgoPipe
  ]
})
export class PipesModule {
}
