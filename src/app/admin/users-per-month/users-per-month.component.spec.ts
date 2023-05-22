import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerMonthComponent } from './users-per-month.component';

describe('UsersPerMonthComponent', () => {
  let component: UsersPerMonthComponent;
  let fixture: ComponentFixture<UsersPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPerMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
