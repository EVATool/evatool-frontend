import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantMainComponent } from './variant-main.component';

describe('VariantMainComponent', () => {
  let component: VariantMainComponent;
  let fixture: ComponentFixture<VariantMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
