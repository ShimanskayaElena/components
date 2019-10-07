import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlErrorComponent } from './control-error/control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { ControlErrorsDirective } from './control-errors.directive';

@NgModule({
  declarations: [
    ControlErrorComponent,
    FormSubmitDirective,
    ControlErrorContainerDirective,
    ControlErrorsDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlErrorComponent,
    FormSubmitDirective,
    ControlErrorContainerDirective,
    ControlErrorsDirective
  ],
  entryComponents: [ ControlErrorComponent ]
})
export class ErrorMessagesModule {
  // валидация рективной формы написана по материалам статьи
  // https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5
  // для проверки используются следующие директивы: form, formControlName, formControl, controlErrorContainer
  // controlErrorContainer - контейнер для компонента, выводящего сообщение об ошибке, его надо использовать с осторожностью
  // можно переопределять текст сообщения об ошибке, если это необходимо в [customErrors]="customErrors"
}
