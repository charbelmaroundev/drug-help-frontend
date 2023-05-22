import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { authLogout } from '../auth/state/auth.actions';
import { PostsService, UserService } from '../services/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  totalUsers: number = 0;
  totalPosts: number = 0;

  constructor(
    private store: Store,
    private postsService: PostsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postsService.postsByMonth().subscribe({
      next: (data) => {
        this.totalPosts = Object.values(data).reduce(
          (partialSum, a) => partialSum + a,
          0
        );
      },
    });

    this.userService.userByMonth().subscribe({
      next: (data) => {
        this.totalUsers = Object.values(data).reduce(
          (partialSum, a) => partialSum + a,
          0
        );
      },
    });
  }

  onLogout() {
    this.store.dispatch(authLogout());
  }
}
