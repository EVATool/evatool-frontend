import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StakeholdersImpactedComponent} from './stakeholders-impacted.component';

describe('StakeholdersImpactedComponent', () => {
  let component: StakeholdersImpactedComponent;
  let fixture: ComponentFixture<StakeholdersImpactedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholdersImpactedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholdersImpactedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
