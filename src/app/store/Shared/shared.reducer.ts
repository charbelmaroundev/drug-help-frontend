import { createReducer, on } from '@ngrx/store';

import { initialeState } from './shared.state';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';

const _sharedReducer = createReducer(
  initialeState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),

  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function sharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
