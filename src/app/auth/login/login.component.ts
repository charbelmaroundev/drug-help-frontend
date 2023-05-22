import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app/store/app.state';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from '../../../app/store/Shared/shared.actions';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
        ),
      ]),
    });
  }

  validationMessages = {
    email: {
      required: 'email is required',
      pattern: 'email is invalid.',
    },

    password: {
      required: 'password is required',
      pattern:
        'password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and cannot contain any spaces.',
    },
  };

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }

  onLoginGoogle() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.authService.loginWithGoogle();
  }

  onLoginFacebook() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.authService.loginWithFacebook();
  }
}
