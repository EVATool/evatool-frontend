import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRemainingComponent } from './auth-remaining.component';

describe('AuthRemainingComponent', () => {
  let component: AuthRemainingComponent;
  let fixture: ComponentFixture<AuthRemainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRemainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
