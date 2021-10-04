import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTypeTableComponent } from './variant-type-table.component';

describe('VariantTypeTableComponent', () => {
  let component: VariantTypeTableComponent;
  let fixture: ComponentFixture<VariantTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
