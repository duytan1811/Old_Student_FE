import { AbstractControl, ValidatorFn } from '@angular/forms';

export function InvalidTrimValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value.toString().trim();
      return value === '' ? { containInvalidTrim: true } : null;
  }
}
