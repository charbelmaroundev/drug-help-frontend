import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { authLogout } from '../../auth/state/auth.actions';
import { PostsService } from '../../services/index';

@Component({
  selector: 'app-post-by-location-chart',
  templateUrl: './post-by-location-chart.component.html',
  styleUrls: ['./post-by-location-chart.component.css'],
})
export class PostByLocationChartComponent {
  page = false;
  chart: any;
  @ViewChild('dChart', { static: false }) dChart!: ElementRef;
  jsonArray: number[] = [];
  chartLabels: any[] = [];
  cutOut: number = 75;
  backgroundColors: string[] = [
    '#9966CC',
    '#FFA07A',
    '#20B2AA',
    '#CD5C5C',
    '#9370DB',
    '#F4A460',
    '#00BFFF',
    '#FF00FF',
    '#008080',
    '#FFD700',
    '#FF69B4',
    '#8A2BE2',
    '#3CB371',
    '#FA8072',
    '#1E90FF',
    '#FFC0CB',
    '#90EE90',
    '#FF6347',
    '#9400D3',
    '#87CEEB',
    '#FF7F50',
    '#32CD32',
    '#FFB6C1',
    '#7B68EE',
    '#FF4500',
    '#ADFF2F',
    '#FF1493',
    '#00FFFF',
    '#FF69B4',
    '#008000',
    '#FFD700',
  ];

  constructor(
    private store: Store,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url.split('/')[2]) this.page = true;

    this.postsService.locationCount().subscribe({
      next: (data: any) => {
        this.jsonArray = data.jsonArray;
        this.chartLabels = data.chartLabels;

        let cvs: any;
        cvs = this.dChart.nativeElement;
        this.chart = new Chart(cvs, {
          type: 'doughnut',
          data: {
            labels: this.chartLabels,
            datasets: [
              {
                data: this.jsonArray,
                backgroundColor: this.backgroundColors,
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,

            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
            },

            plugins: {
              title: {
                display: true,
                text: 'Posts by Location',
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
