import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterPriorityComponent} from './filter-priority.component';

describe('FilterPriorityComponent', () => {
  let component: FilterPriorityComponent;
  let fixture: ComponentFixture<FilterPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
