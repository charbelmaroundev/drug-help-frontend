import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPerMonthComponent } from './posts-per-month.component';

describe('PostsPerMonthComponent', () => {
  let component: PostsPerMonthComponent;
  let fixture: ComponentFixture<PostsPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsPerMonthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
