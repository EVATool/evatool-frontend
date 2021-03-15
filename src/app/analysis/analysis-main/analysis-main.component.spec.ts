// @ts-ignore
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisMainComponent } from './analysis-main.component';

describe('StakeholderMainComponent', () => {
  let component: AnalysisMainComponent;
  let fixture: ComponentFixture<AnalysisMainComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
