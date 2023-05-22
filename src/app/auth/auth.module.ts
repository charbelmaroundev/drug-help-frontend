import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      { path: 'login', component: LoginComponent },

      { path: 'signup', component: SignupComponent },

      {
        path: 'verify-email/:token',
        component: EmailVerificationComponent,
      },

      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },

      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
      },

      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    EmailVerificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(),
  ],
})
export class AuthModule {}
