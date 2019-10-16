import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { ErrorMessagesModule } from '../error-messages/error-messages.module';
import { CustomInputComponent } from './custom-input/custom-input.component';

@NgModule({
  declarations: [CustomInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    ErrorMessagesModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    ErrorMessagesModule,
    CustomInputComponent
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
