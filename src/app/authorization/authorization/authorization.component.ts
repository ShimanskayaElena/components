import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { accountValidator } from '../../validators/account.validator';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  authorizationForm: FormGroup;
  errorCustomInput: boolean;
  private unSubscribe$ = new Subject();

  constructor( private builder: FormBuilder ) {
    this._createAuthorizationForm();
  }

  private _createAuthorizationForm() {
    this.authorizationForm = this.builder.group({
      login: ['', [Validators.required, Validators.minLength(4), accountValidator(/admin/i)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get login() {
    return this.authorizationForm.get('login');
  }

  // наблюдаем за ошибками в кастомном элементе формы чтобы корректно стилизовать его
  watchError() {
    this.login.errors !== null ? this.errorCustomInput = true : this.errorCustomInput = false;
  }

  ngOnInit() {
    this.authorizationForm.get('login')
      .valueChanges
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(
        (value) => {
          this.watchError();
        }
      );
  }

  onSubmit() {
    this.watchError();
  }
}
