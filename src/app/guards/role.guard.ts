import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../services/user.service';

import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const roles = route.data['roles'];

    return this.userService.whoAmi().pipe(
      map((data: any) => {
        if (data.role === 'ADMIN') {
          return true;
        } else {
          this.router.navigate(['/']);
          this.notificationsService.addMessages(
            'You dont have access to this path',
            'error'
          );
          return false;
        }
      })
    );
  }
}
