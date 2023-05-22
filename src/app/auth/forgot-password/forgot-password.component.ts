import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app/store/app.state';
import { forgotPasswordStart } from '../state/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  emailSent = false;
  hiddenEmail!: string;
  forgotPasswordForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
    });
  }

  validationMessages = {
    email: {
      required: 'email is required',
      pattern: 'email is invalid.',
    },
  };

  get email() {
    return this.forgotPasswordForm.get('email')!;
  }

  onforgotPassword() {
    const { email } = this.forgotPasswordForm.value;
    this.emailSent = true;
    this.hiddenEmail = this.hideEmail(email);
    this.store.dispatch(forgotPasswordStart({ email }));
  }

  hideEmail(email: string) {
    return email.replace(/(.{1})(.*)(?=@)/, (gp1, gp2, gp3) => {
      for (let i = 0; i < gp3.length; i++) {
        gp2 += '*';
      }
      return gp2;
    });
  }
}
