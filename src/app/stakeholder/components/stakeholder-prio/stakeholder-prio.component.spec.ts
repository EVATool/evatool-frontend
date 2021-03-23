import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderPrioComponent } from './stakeholder-prio.component';

describe('StakeholderPrioComponent', () => {
  let component: StakeholderPrioComponent;
  let fixture: ComponentFixture<StakeholderPrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderPrioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderPrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
