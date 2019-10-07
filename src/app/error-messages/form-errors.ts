import { InjectionToken } from '@angular/core';

// объект, содержащий сообщения об ошибках по умолчанию

export const defaultErrors = {
  required: (error) => `This field is required`,
  minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`,
  login: (error) => `Not allowed use ${error} as login`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
