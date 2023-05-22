import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUser } from '../../../app/models/user.model';
import { authLogout } from '../../auth/state/auth.actions';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  page = true;
  users!: IUser[];

  constructor(private store: Store, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllClient().subscribe({
      next: (data: any) => {
        this.users = data;
      },
    });
  }

  onBanUnBan(id: number, method: string) {
    this.userService.banUnBan(id, method).subscribe(() => {
      this.userService.getAllClient().subscribe({
        next: (data: any) => {
          this.users = data;
        },
      });
    });
  }

  onLogout() {
    this.store.dispatch(authLogout());
  }
}
