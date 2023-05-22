import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post<any>(
      'http://localhost:3000/api/v1/user/changepassword',
      {
        oldPassword,
        newPassword,
      }
    );
  }
}
