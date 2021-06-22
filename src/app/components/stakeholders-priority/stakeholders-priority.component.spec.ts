import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StakeholdersPriorityComponent} from './stakeholders-priority.component';
import {SpecService} from '../../services/spec.service';

describe('StakeholdersPriorityComponent', () => {
  let component: StakeholdersPriorityComponent;
  let fixture: ComponentFixture<StakeholdersPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
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
