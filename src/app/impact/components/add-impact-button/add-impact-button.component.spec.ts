import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpactButtonComponent } from './add-impact-button.component';

describe('AddImpactButtonComponent', () => {
  let component: AddImpactButtonComponent;
  let fixture: ComponentFixture<AddImpactButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImpactButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImpactButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
