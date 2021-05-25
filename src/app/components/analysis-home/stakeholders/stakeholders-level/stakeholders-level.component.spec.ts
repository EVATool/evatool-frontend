import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholdersLevelComponent } from './stakeholders-level.component';

describe('StakeholdersLevelComponent', () => {
  let component: StakeholdersLevelComponent;
  let fixture: ComponentFixture<StakeholdersLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholdersLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholdersLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
