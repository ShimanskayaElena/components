import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// компонент для отображения текста ошибок
@Component({
  templateUrl: './control-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent {
  text1: string; // текст ошибки
  hide1 = true;

  @Input() set text(value) {
    if (value !== this.text) {
      this.text1 = value;
      this.hide1 = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }
}
