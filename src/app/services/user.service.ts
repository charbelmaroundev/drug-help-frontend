import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  whoAmi() {
    return this.http.get<IUser>(`http://localhost:3000/api/v1/user/whoami`);
  }

  userByMonth() {
    return this.http.get(`http://localhost:3000/api/v1/user/user-by-month`);
  }

  getAllClient() {
    return this.http.get(`http://localhost:3000/api/v1/user`);
  }

  banUnBan(id: number, method: string) {
    return this.http.get(
      `http://localhost:3000/api/v1/user/account/${method}/${id}`
    );
  }

  updateUser(
    firstName: string,
    lastName: string,
    picture: string | ArrayBuffer | null
  ) {
    return this.http.post(`http://localhost:3000/api/v1/user`, {
      firstName,
      lastName,
      picture,
    });
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post(`http://localhost:3000/api/v1/user/changepassword`, {
      oldPassword,
      newPassword,
    });
  }

  deleteAccount(password: string) {
    return this.http.post(`http://localhost:3000/api/v1/user/deleteaccount`, {
      password,
    });
  }

  unlinkAccount(password: string) {
    return this.http.post(`http://localhost:3000/api/v1/user/unlinkaccount`, {
      password,
    });
  }
}
