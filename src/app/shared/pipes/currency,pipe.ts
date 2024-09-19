import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, localize: string = 'vi-VN', currency: string = 'vnd'): string {
    if (!value && value !== 0) return '';
    return value.toLocaleString(localize, { style: 'currency', currency: currency });
  }

}
