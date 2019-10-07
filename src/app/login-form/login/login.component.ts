import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { accountValidator } from '../account.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // переопределяем текст сообщения об ошибке, если это необходимо
  customErrors = {
    required: 'Пожалуйста, примите условия' // Please accept the terms
  };

  constructor( private builder: FormBuilder ) {
    this._createLoginForm();
  }

  private _createLoginForm() {
    this.loginForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [ Validators.required, accountValidator(/test/i) ] ],
      terms: ['', Validators.requiredTrue],
      address: this.builder.group({
        city: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
  }
}
