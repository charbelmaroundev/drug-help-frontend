import { createAction, props } from '@ngrx/store';
import { Access_Token } from 'src/app/models/user.model';

export const LOGIN_START = '[auth page] login start';
export const OAUTH_GOOGLE_LOGIN_START = '[auth page] OAuth Google login start';
export const OAUTH_FACEBOOK_LOGIN_START =
  '[auth page] OAuth Facebook login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const AUTH_LOGIN = '[auth page] auth login';
export const AUTH_LOGOUT = '[auth page] auth logout';

export const EMAIL_VERIFICATION_START = '[auth page] email verification start';

export const FORGOT_PASSWORD_START = '[auth page] forgot password start';
export const RESET_PASSWORD_START = '[auth page] reset password start';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const OAuthGoogleloginStart = createAction(
  OAUTH_GOOGLE_LOGIN_START,
  props<{
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    provider: string;
  }>()
);

export const OAuthFacebookloginStart = createAction(
  OAUTH_FACEBOOK_LOGIN_START,
  props<{
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    provider: string;
  }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ access_token: Access_Token; redirect: boolean }>()
);

export const loginFail = createAction(LOGIN_FAIL);

export const signupStart = createAction(
  SIGNUP_START,
  props<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ access_token: Access_Token }>()
);

export const authLogin = createAction(AUTH_LOGIN);

export const authLogout = createAction(AUTH_LOGOUT);

export const emailVerificationStart = createAction(
  EMAIL_VERIFICATION_START,
  props<{ token: string | null }>()
);

export const forgotPasswordStart = createAction(
  FORGOT_PASSWORD_START,
  props<{ email: string }>()
);

export const resetPasswordStart = createAction(
  RESET_PASSWORD_START,
  props<{ email: string; token: string | null; newPassword: string }>()
);
