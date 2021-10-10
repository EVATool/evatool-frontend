import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantFilterBarComponent } from './variant-filter-bar.component';

describe('VariantFilterBarComponent', () => {
  let component: VariantFilterBarComponent;
  let fixture: ComponentFixture<VariantFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
