import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDimensionButtonComponent } from './add-dimension-button.component';

describe('AddDimensionButtonComponent', () => {
  let component: AddDimensionButtonComponent;
  let fixture: ComponentFixture<AddDimensionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDimensionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDimensionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
