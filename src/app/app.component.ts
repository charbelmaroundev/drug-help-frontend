import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/Shared/shared.selector';
import { authLogin } from './auth/state/auth.actions';
import { setLoadingSpinner } from './store/Shared/shared.actions';
import { UserService, AuthService } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<string>;
  role = '';

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);

    this.store.dispatch(authLogin());

    const access_token = this.authService.getLocalStorage();
    if (access_token) {
      this.userService.whoAmi().subscribe({
        next: (data) => {
          this.role = data.role;
          if (this.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          }
        },
      });
    }
  }
}
