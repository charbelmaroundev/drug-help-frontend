import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostByLocationChartComponent } from './post-by-location-chart.component';

describe('PostByLocationChartComponent', () => {
  let component: PostByLocationChartComponent;
  let fixture: ComponentFixture<PostByLocationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostByLocationChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostByLocationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
