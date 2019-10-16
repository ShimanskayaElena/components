import { Directive, ViewContainerRef } from '@angular/core';

// атрибутивная директива, указывающая на хостовый элемент для элемента, вывождящего сообщение об ошибке

@Directive({
  selector: '[controlErrorContainer]'
})
export class ControlErrorContainerDirective {

  constructor(public vcr: ViewContainerRef) { }

}
