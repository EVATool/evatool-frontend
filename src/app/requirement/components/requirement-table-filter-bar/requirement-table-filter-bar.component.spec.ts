import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequirementTableFilterBarComponent} from './requirement-table-filter-bar.component';

describe('RequirementTableFilterBarComponent', () => {
  let component: RequirementTableFilterBarComponent;
  let fixture: ComponentFixture<RequirementTableFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementTableFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementTableFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
