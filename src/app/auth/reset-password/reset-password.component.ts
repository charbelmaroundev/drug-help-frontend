import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app/store/app.state';
import { resetPasswordStart } from '../state/auth.actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  token!: string | null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),

      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
        ),
      ]),
    });

    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.token = params.get('token');
      },
    });
  }

  validationMessages = {
    email: {
      required: 'email is required',
      pattern: 'email is invalid.',
    },

    newPassword: {
      required: 'password is required',
      pattern:
        'password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and cannot contain any spaces.',
    },
  };

  get email() {
    return this.resetPasswordForm.get('email')!;
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword')!;
  }

  onResetPassword() {
    const { email, newPassword } = this.resetPasswordForm.value;

    this.store.dispatch(
      resetPasswordStart({ token: this.token, email, newPassword })
    );
  }
}
