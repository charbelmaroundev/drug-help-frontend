import { createAction, props } from '@ngrx/store';

export const CHANGE_PASSWORD_START = '[settings page] change password start';
export const CHANGE_PASSWORD_SUCCESS =
  '[settings page] change password success';
export const CHANGE_PASSWORD_FAIL = '[settings page] change password fail';

export const changePasswordStart = createAction(
  CHANGE_PASSWORD_START,
  props<{ oldPassword: string; newPassword: string }>()
);

export const changePasswordSuccess = createAction(
  CHANGE_PASSWORD_SUCCESS,
  props<{ oldPassword: string; newPassword: string }>()
);

export const changePasswordFail = createAction(CHANGE_PASSWORD_FAIL);
