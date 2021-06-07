import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ColumnCategoryFilterComponent} from './column-category-filter.component';

describe('ColumnCategoryFilterComponent', () => {
  let component: ColumnCategoryFilterComponent;
  let fixture: ComponentFixture<ColumnCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnCategoryFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
