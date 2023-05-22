import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { changePasswordStart, changePasswordSuccess } from './settings.actions';
import { SettingsService } from '../../services/settings.service';
import { NotificationsService } from '../../../app/services/notifications.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../../app/store/Shared/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private store: Store,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  changePassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(changePasswordStart),
        exhaustMap((action) => {
          return this.settingsService
            .changePassword(action.oldPassword, action.newPassword)
            .pipe(
              map((data: any) => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                this.notificationsService.addMessages(data.message, 'success');
                return changePasswordSuccess({
                  oldPassword: action.oldPassword,
                  newPassword: action.newPassword,
                });
              }),
              catchError((err) => {
                return of(setErrorMessage({ message: err.error.message }));
              })
            );
        })
      );
    },
    { dispatch: false }
  );
}
