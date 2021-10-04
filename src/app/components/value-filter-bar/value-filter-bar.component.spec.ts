import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueFilterBarComponent } from './value-filter-bar.component';

describe('ValueFilterBarComponent', () => {
  let component: ValueFilterBarComponent;
  let fixture: ComponentFixture<ValueFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
