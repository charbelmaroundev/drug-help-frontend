import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  OAuthFacebookloginStart,
  OAuthGoogleloginStart,
  authLogin,
  authLogout,
  emailVerificationStart,
  forgotPasswordStart,
  loginStart,
  loginSuccess,
  resetPasswordStart,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/Shared/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data: any) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const access_token = this.authService.formatAccessToken(data);
            // this.store.dispatch(setErrorMessage({ message: '' }));
            this.notificationsService.addMessages(
              'Logged In Successfully',
              'success'
            );
            this.authService.setUserInLocalStorage(access_token);
            return loginSuccess({ access_token, redirect: true });
          }),
          catchError((err) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.notificationsService.addMessages(err.error.message, 'error');
            return of(setErrorMessage({ message: err.error.message }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.store.dispatch(
            setErrorMessage({ message: 'Logged In successfully' })
          );

          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  OAuthGooglelogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OAuthGoogleloginStart),
      exhaustMap((action) => {
        return this.authService
          .loginOAuthGoogle(
            action.email,
            action.firstName,
            action.lastName,
            action.picture,
            action.provider
          )
          .pipe(
            map((data: any) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const access_token = this.authService.formatAccessToken(data);
              // this.store.dispatch(setErrorMessage({ message: '' }));
              // this.notificationsService.addMessages(
              //   'Logged In Successfully',
              //   'success'
              // );
              this.authService.setUserInLocalStorage(access_token);
              return loginSuccess({ access_token, redirect: true });
            }),
            catchError((err) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.notificationsService.addMessages(err.error.message, 'error');
              return of(setErrorMessage({ message: err.error.message }));
            })
          );
      })
    );
  });

  OAuthFacebooklogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OAuthFacebookloginStart),
      exhaustMap((action) => {
        return this.authService
          .loginOAuthFacebook(
            action.email,
            action.firstName,
            action.lastName,
            action.picture,
            action.provider
          )
          .pipe(
            map((data: any) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const access_token = this.authService.formatAccessToken(data);
              // this.store.dispatch(setErrorMessage({ message: '' }));
              // this.notificationsService.addMessages(
              //   'Logged In Successfully',
              //   'success'
              // );
              this.authService.setUserInLocalStorage(access_token);
              return loginSuccess({ access_token, redirect: true });
            }),
            catchError((err) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.notificationsService.addMessages(err.error.message, 'error');
              return of(setErrorMessage({ message: err.error.message }));
            })
          );
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService
          .signup(
            action.firstName,
            action.lastName,
            action.email,
            action.password
          )
          .pipe(
            map((data: any) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              // this.store.dispatch(setErrorMessage({ message: '' }));
              this.notificationsService.addMessages(data.message, 'success');
              const access_token = this.authService.formatAccessToken(data);

              return signupSuccess({ access_token });
            }),
            catchError((err) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.notificationsService.addMessages(err.error.message, 'error');
              return of(setErrorMessage({ message: err.error.message }));
            })
          );
      })
    );
  });

  signupRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signupSuccess),
        tap(() => {
          this.store.dispatch(setErrorMessage({ message: '' }));

          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  authLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authLogin),
        exhaustMap((action) => {
          return this.authService.checkToken().pipe(
            map((data: any) => {
              // this.store.dispatch(
              //   setErrorMessage({ message: 'logged in successfully' })
              // );
              this.notificationsService.addMessages(
                'Logged In Successfully',
                'success'
              );
              const access_token = this.authService.formatAccessToken(data);
              this.store.dispatch(
                loginSuccess({ access_token, redirect: false })
              );
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return loginSuccess({ access_token, redirect: false });
            }),
            catchError(() => {
              this.authService.clearUserInLocalStorage();
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authLogout),
        map((action) => {
          this.notificationsService.addMessages('Logged Out', 'success');
          this.authService.logout();
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  emailVerification$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(emailVerificationStart),
        exhaustMap((action) => {
          return this.authService.verifyEmail(action.token).pipe(
            map((data: any) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.notificationsService.addMessages(
                'Email Verified!',
                'success'
              );
              this.router.navigate(['/auth']);
            }),
            catchError((err) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.notificationsService.addMessages(err.error.message, 'error');
              return of(setErrorMessage({ message: err.error.message }));
            })
          );
        })
      );
    },
    {
      dispatch: false,
    }
  );

  forgotPassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(forgotPasswordStart),
        exhaustMap((action) => {
          return this.authService.forgotPassword(action.email).pipe(
            map((data: any) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.notificationsService.addMessages(data.message, 'success');
              // this.router.navigate(['/auth']);
            }),
            catchError((err) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.notificationsService.addMessages(err.error.message, 'error');
              return of(setErrorMessage({ message: err.error.message }));
            })
          );
        })
      );
    },
    {
      dispatch: false,
    }
  );

  resetPassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(resetPasswordStart),
        exhaustMap((action) => {
          return this.authService
            .resetPassword(action.email, action.token, action.newPassword)
            .pipe(
              map((data: any) => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                this.notificationsService.addMessages(data.message, 'success');
                this.router.navigate(['/auth']);
              }),
              catchError((err) => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                this.notificationsService.addMessages(
                  err.error.message,
                  'error'
                );
                this.router.navigate(['/auth/forgot-password']);
                return of(setErrorMessage({ message: err.error.message }));
              })
            );
        })
      );
    },
    {
      dispatch: false,
    }
  );
}
