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

  it('should have name in title', () => {
    const testName = 'testName';
    component.name = testName;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#filter-header-text')).nativeElement.textContent).toContain(testName);
  });

  it('should be invisible at start', () => {
    console.log(fixture.debugElement.query(By.css('#visibility-wrapper')).nativeElement);
    expect(fixture.debugElement.query(By.css('#visibility-wrapper')).nativeElement.hidden).toBeTruthy();
  });

  it('should be visible after toggling visibility', () => {
    component.toggleVisibility();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#visibility-wrapper')).nativeElement.hidden).toBeFalsy();
  });

});
