import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ColumnSliderFilterComponent} from './column-slider-filter.component';

describe('ColumnSliderFilterComponent', () => {
  let component: ColumnSliderFilterComponent;
  let fixture: ComponentFixture<ColumnSliderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnSliderFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSliderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
