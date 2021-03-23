import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderImpactComponent } from './stakeholder-impact.component';

describe('StakeholderImpactComponent', () => {
  let component: StakeholderImpactComponent;
  let fixture: ComponentFixture<StakeholderImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderImpactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
