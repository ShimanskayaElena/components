import { AbstractControl, ValidatorFn } from '@angular/forms';

// кастомный валидатор для проверки введённого пользователем логина
export function accountValidator(loginRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any } | null => {
    const valid = loginRe.test(control.value);
    // return valid ? { login : true } : null;
    return valid ? { login : control.value } : null;
  };
}
