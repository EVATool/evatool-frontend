import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactedFilterComponent} from './impacted-filter.component';

describe('ImpactedFilterComponent', () => {
  let component: ImpactedFilterComponent;
  let fixture: ComponentFixture<ImpactedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactedFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
