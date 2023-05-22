import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      localStorage.clear();
      this.router.navigate(['/auth']);
      return false;
    }

    return this.authService.checkToken().pipe(
      map((data: any) => {
        if (data.message === 'jwt valid') {
          return true;
        } else {
          this.router.navigate(['/auth']);
          localStorage.clear();
          return false;
        }
      })
    );
  }
}
