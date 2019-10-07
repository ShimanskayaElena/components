import {
  Directive,
  AfterViewInit,
  OnDestroy,
  Input,
  Optional,
  Inject,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Host,
  ElementRef,
  ContentChildren } from '@angular/core';
import { NgControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {merge, Observable, EMPTY, fromEvent, from } from 'rxjs';

import { FORM_ERRORS } from './form-errors';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements AfterViewInit, OnDestroy {

  submit$: Observable<Event>;  // поток событий нажатия на кнопку c type="submit"
  ref: ComponentRef<ControlErrorComponent>;  // динамический компонент, в котором будет отображаться сообщение об ошибке
  container: ViewContainerRef;  // ссылка на host элемент-контейнер, если он есть

  @Input() customErrors = {};

  constructor(
    private controlDir: NgControl, // ссылка на текущий экземпляр управления (элемент формы), который будет валидироваться при помощи этой директивы
    @Inject( FORM_ERRORS ) private errors,
    @Optional() @Host() private form: FormSubmitDirective, // получаем ссылку на директиву
    private vcr: ViewContainerRef, // текущий хост-контейнер
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr; // устанавливаем хост-контейнер
    this.submit$ = this.form ? this.form.submit$ : EMPTY; // EMPTY - наблюдаемое, которое ничего не делает и немедленно завершает поток
  }

  get control() {
    return this.controlDir.control;
  }

  ngAfterViewInit(): void {
    merge(
      this.submit$,  // при событии submit
      this.control.valueChanges  // при изменении значения в элементе формы, т.е. когда пользователь начинает взаимодействовать с этим элементом формы
    ).pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      const controlErrors = this.control.errors;  // массив ошибок данного элемента формы
      if (controlErrors) {
        // console.log('массив ошибок данного элемента формы this.control.errors ', controlErrors);
        const firstKey = Object.keys(controlErrors)[0];  // первая ошибка из массива ключей ошибок
        // console.log('ключ ошибки ', firstKey);
        const getError = this.errors[firstKey];  // функция getError, возврашающая сообщение об ошибке из defaultErrors
        // console.log('функция getError, возврашающая сообщение об ошибке из defaultErrors ', getError);
        const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]); // текст первой ошибки
        // console.log('this.customErrors[firstKey] ', this.customErrors[firstKey]);
        // console.log('getError(controlErrors[firstKey]) ', getError(controlErrors[firstKey]));
        this.setError(text);
      } else if (this.ref) {
        this.setError(null);
      }
    });
  }

  // обработчик ошибок
  setError(text: string) {
    if (!this.ref) {
      // динамически создаем компонент из ControlErrorComponent
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.vcr.createComponent(factory);
    }
    // устанавливаем текстовое сообщение об текущей ошибке
    this.ref.instance.text = text;
  }

  ngOnDestroy(): void {
  }

}
