import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StakeholderTableComponent} from './stakeholder-table.component';
import {SpecService} from '../../services/spec.service';

describe('StakeholderTableComponent', () => {
  let component: StakeholderTableComponent;
  let fixture: ComponentFixture<StakeholderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [ StakeholderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
