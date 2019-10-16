import { Component, Input, ViewChild, ElementRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {

  valueCustomInput: string;
  onBlur: boolean;

  @Input() label: string;
  @Input() type: string;
  @Input() error: boolean;

  @ViewChild('customInput', {static: false})
  customInput: ElementRef;

  addBorder() {
    ( this.valueCustomInput !== undefined && this.error === false ) ? this.onBlur = true : this.onBlur = false;
  }

  removeBorder() {
    this.onBlur = false;
  }

  // метод, который в качестве параметра принимает функцию обратного вызова,
  // которая будет вызываться при изменении значения посредством UI
  // Он уведомляет Angular о том, что необходимо применить к нашему элементу соответствующие CSS классы и вызвать валидаторы

  onChange: any = () => {
  };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  // здесь регистрируется обработчик специально для случаев , когда элемент управления получает событие касания
  // Он уведомляет Angular о том, что необходимо применить к нашему элементу соответствующие CSS классы и вызвать валидаторы

  onTouched: any = () => {
  };

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // обновление локальной модели valueCustomInput
  writeValue(value: string) {
    if ( value === undefined ) { // || typeof value !== 'string'
      return;
    }
    this.valueCustomInput = value;
    this.onChange(this.valueCustomInput); // информируем Angular о том, что значение было изменено
  }

  changeValueInput() {
    this.writeValue(this.customInput.nativeElement.value);
    this.onTouched();
  }
}
