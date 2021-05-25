import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholdersPriorityComponent } from './stakeholders-priority.component';

describe('StakeholdersPriorityComponent', () => {
  let component: StakeholdersPriorityComponent;
  let fixture: ComponentFixture<StakeholdersPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholdersPriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholdersPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
