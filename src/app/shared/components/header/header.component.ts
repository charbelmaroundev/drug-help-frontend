import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { authLogout } from '../../../../app/auth/state/auth.actions';
import { isAuthenticated } from '../../../../app/auth/state/auth.selector';
import { PostsService } from '../../../services/posts.service';
import { UserService } from '../../../services/user.service';
import { ALebanonCity, ELebanonCity } from '../../../../app/models/post.model';
import { IUser } from '../../../../app/models/user.model';
import { AuthService } from '../../../../app/services/auth.service';
import { NotificationsService } from '../../../../app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  porfileClicked!: boolean;
  isAuthenticated!: Observable<boolean>;
  Location!: ELebanonCity;
  locations: ELebanonCity[] = ALebanonCity;
  searchForm!: FormGroup;
  user = {} as IUser;

  constructor(
    private store: Store,
    private postsService: PostsService,
    private userService: UserService,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);

    this.searchForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
    });

    const access_token = this.authService.getLocalStorage();
    if (access_token) {
      this.userService.whoAmi().subscribe((data: any) => {
        this.user = data;
      });
    }
  }

  onLogout() {
    this.store.dispatch(authLogout());
  }

  onSelectLocation(event: any) {
    const { value } = event.target;
    this.postsService.loaction(value);
  }

  onSearch(event: any) {
    const { value } = event.target;
    this.postsService.search(value);
  }

  onSell() {
    if (Object.keys(this.user).length === 0) {
      this.notificationsService.addMessages(
        'Please log in before Selling!',
        'error'
      );
    }
  }
}
