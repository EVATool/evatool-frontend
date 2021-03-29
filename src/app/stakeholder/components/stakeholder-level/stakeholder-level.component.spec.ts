import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderLevelComponent } from './stakeholder-level.component';

describe('StakeholderLevelComponent', () => {
  let component: StakeholderLevelComponent;
  let fixture: ComponentFixture<StakeholderLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
