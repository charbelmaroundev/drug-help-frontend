import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { setLoadingSpinner } from '../../../app/store/Shared/shared.actions';
import { AppState } from '../../../app/store/app.state';
import { loginStart, signupStart } from '../state/auth.actions';
import { AuthService } from '../../../app/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{3,}$/),
      ]),

      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{3,}$/),
      ]),

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
    firstName: {
      required: 'first name is required',
      pattern: 'first name should be at least 3 characters.',
    },

    lastName: {
      required: 'last name is required',
      pattern: 'last name should be at least 3 characters.',
    },

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

  get firstName() {
    return this.signupForm.get('firstName')!;
  }

  get lastName() {
    return this.signupForm.get('lastName')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  onSignup() {
    const { firstName, lastName, email, password } = this.signupForm.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ firstName, lastName, email, password }));
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
