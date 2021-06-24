import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StakeholderImpactedComponent} from './stakeholder-impacted.component';

describe('StakeholderImpactedComponent', () => {
  let component: StakeholderImpactedComponent;
  let fixture: ComponentFixture<StakeholderImpactedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderImpactedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderImpactedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
