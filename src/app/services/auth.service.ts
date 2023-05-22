import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

import { AuthResponseData } from '../models/auth.model';
import { Access_Token } from '../models/user.model';
import { NotificationsService } from './notifications.service';
import { AppState } from '../store/app.state';
import {
  OAuthFacebookloginStart,
  OAuthGoogleloginStart,
} from '../auth/state/auth.actions';
import { setLoadingSpinner } from '../store/Shared/shared.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
    private fireauth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  login(email: string, password: string) {
    return this.http.post(`http://localhost:3000/api/v1/auth/signin`, {
      email,
      password,
    });
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post(`http://localhost:3000/api/v1/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
  }

  formatAccessToken(data: AuthResponseData) {
    return new Access_Token(data.access_token);
  }

  getLocalStorage() {
    return localStorage.getItem('access_token');
  }

  setUserInLocalStorage(user: Access_Token) {
    localStorage.setItem('access_token', JSON.stringify(user.access_token));
  }

  clearUserInLocalStorage() {
    localStorage.clear();
  }

  checkToken() {
    let access_token = localStorage.getItem('access_token');

    if (access_token) {
      access_token = JSON.parse(access_token);
    }

    return this.http.post(`http://localhost:3000/api/v1/auth/checktoken`, {
      access_token,
    });
  }

  verifyEmail(token: string | null) {
    return this.http.post(
      `http://localhost:3000/api/v1/auth/emailverification`,
      {
        token,
      }
    );
  }

  forgotPassword(email: string) {
    return this.http.post(
      `http://localhost:3000/api/v1/auth/generateforgotpasswordKey`,
      {
        email,
      }
    );
  }

  resetPassword(email: string, token: string | null, newPassword: string) {
    return this.http.post(`http://localhost:3000/api/v1/auth/resetpassword`, {
      email,
      token,
      newPassword,
    });
  }

  loginWithGoogle() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res: any) => {
        const { providerId } = res.additionalUserInfo;

        const { email, family_name, given_name, picture } =
          res.additionalUserInfo.profile;

        this.store.dispatch(setLoadingSpinner({ status: true }));
        this.store.dispatch(
          OAuthGoogleloginStart({
            email,
            firstName: given_name,
            lastName: family_name,
            picture,
            provider: providerId,
          })
        );
      },
      (err) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        this.notificationsService.addMessages(err.message, 'error');
      }
    );
  }

  loginOAuthGoogle(
    email: string,
    firstName: string,
    lastName: string,
    picture: string,
    provider: string
  ) {
    return this.http.post(`http://localhost:3000/api/v1/auth/google/redirect`, {
      email,
      firstName,
      lastName,
      picture,
      provider,
    });
  }

  loginOAuthFacebook(
    email: string,
    firstName: string,
    lastName: string,
    picture: string,
    provider: string
  ) {
    return this.http.post(
      `http://localhost:3000/api/v1/auth/facebook/redirect`,
      {
        email,
        firstName,
        lastName,
        picture,
        provider,
      }
    );
  }

  loginWithFacebook() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider()).then(
      (res: any) => {
        const { providerId } = res.additionalUserInfo;
        const { url } = res.additionalUserInfo.profile.picture.data;
        const { email, first_name, last_name } = res.additionalUserInfo.profile;

        this.store.dispatch(setLoadingSpinner({ status: true }));
        this.store.dispatch(
          OAuthFacebookloginStart({
            email,
            firstName: first_name,
            lastName: last_name,
            picture: url,
            provider: providerId,
          })
        );
      },
      (err) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        this.notificationsService.addMessages(err.message, 'error');
      }
    );
  }

  logout() {
    this.clearUserInLocalStorage();
  }
}
