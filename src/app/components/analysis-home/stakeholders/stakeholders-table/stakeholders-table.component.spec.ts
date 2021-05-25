import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholdersTableComponent } from './stakeholders-table.component';

describe('StakeholdersTableComponent', () => {
  let component: StakeholdersTableComponent;
  let fixture: ComponentFixture<StakeholdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholdersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
