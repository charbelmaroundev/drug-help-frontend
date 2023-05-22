import { createReducer, on } from '@ngrx/store';

import { initialeState } from './auth.state';
import { authLogout, loginSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialeState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      access_token: action.access_token,
    };
  }),

  on(authLogout, (state, action) => {
    return {
      ...state,
      access_token: null,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
