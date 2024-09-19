import { AbstractControl, ValidatorFn } from '@angular/forms';

export function InvalidWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value.search(' ') !== -1) {
      return { containInvalidWhitespace: true };
    }
    return null;
  };
}
