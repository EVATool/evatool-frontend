import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholdersFilterBarComponent } from './stakeholders-filter-bar.component';

describe('StakeholdersFilterBarComponent', () => {
  let component: StakeholdersFilterBarComponent;
  let fixture: ComponentFixture<StakeholdersFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholdersFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholdersFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
