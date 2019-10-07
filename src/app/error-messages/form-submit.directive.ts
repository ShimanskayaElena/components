import { Directive, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
  selector: 'form'  // В реальной жизни более конкретный селектор, например form[appForm]
})
export class FormSubmitDirective {
  // для тех ошибок, когда пользователь нажмет на кнопку отправки без какого-либо взаимодействия
  submit$ = fromEvent(this.element, 'submit')
    .pipe(
      tap(() => {
        if (this.element.classList.contains('submitted') === false) {
          this.element.classList.add('submitted'); // добавляем стиль ошибок ввода
        }
      }),
      shareReplay(1)); // берём из потока только первое событие, т.е. обработчик события сработает только один раз

  constructor(private host: ElementRef<HTMLFormElement>) { }

  get element() {
    return this.host.nativeElement;
  }
}
