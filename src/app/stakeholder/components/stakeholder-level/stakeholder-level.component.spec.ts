import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderLevelComponent } from './stakeholder-level.component';
import {HighlightSearchPipe} from "../../../shared/pipes/highlightSearch/highlight-search.pipe";

describe('StakeholderLevelComponent', () => {
  let component: StakeholderLevelComponent;
  let fixture: ComponentFixture<StakeholderLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderLevelComponent , HighlightSearchPipe],
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
