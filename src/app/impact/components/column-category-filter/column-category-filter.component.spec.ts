import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ColumnCategoryFilterComponent} from './column-category-filter.component';
import {By} from '@angular/platform-browser';

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

  // visibility-wrapper
  it('should find <mat-list-item> with provided categories', () => {
    component.categories = ['A', 'B'];
    fixture.detectChanges();
    const listElement = fixture.debugElement.nativeElement.querySelector('mat-list-item');
    expect(listElement).toBeTruthy();
  });
});
