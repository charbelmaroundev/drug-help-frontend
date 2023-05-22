import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { authLogout } from '../../auth/state/auth.actions';
import { PostsService } from '../../services/index';

@Component({
  selector: 'app-posts-per-month',
  templateUrl: './posts-per-month.component.html',
  styleUrls: ['./posts-per-month.component.css'],
})
export class PostsPerMonthComponent {
  page = false;

  constructor(
    private store: Store,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url.split('/')[2]) this.page = true;

    this.postsService.postsByMonth().subscribe({
      next: (data: any) => {
        var myChart = new Chart('postChart', {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [
              {
                label: '# of Posts',
                data: Object.values(data),
                backgroundColor: [
                  '#4c4c4c', // Dark gray
                  '#7cb5ec', // Sky blue
                  '#434348', // Gray
                  '#90ed7d', // Light green
                  '#f7a35c', // Orange
                  '#8085e9', // Purple
                  '#f15c80', // Pink
                  '#e4d354', // Yellow
                  '#2b908f', // Teal
                  '#f45b5b', // Red
                  '#91e8e1', // Light teal
                  '#7cb5ec', // Duplicate sky blue
                ],
                borderColor: [
                  '#2b2b2b', // Black
                  '#7cb5ec', // Sky blue
                  '#3f3f3f', // Dark gray
                  '#73ba49', // Green
                  '#ffa94d', // Dark orange
                  '#5c5ce9', // Dark purple
                  '#f15c80', // Pink
                  '#dbb448', // Gold
                  '#238f8f', // Dark teal
                  '#f45b5b', // Red
                  '#59d5d3', // Light teal
                  '#7cb5ec', // Duplicate sky blue
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Posts Per Month',
                padding: 10,
              },
            },
          },
        });
      },
    });
  }

  onLogout() {
    this.store.dispatch(authLogout());
  }
}
