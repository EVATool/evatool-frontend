import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StakeholderPriorityComponent} from './stakeholder-priority.component';
import {SpecService} from '../../services/spec.service';

describe('StakeholderPriorityComponent', () => {
  let component: StakeholderPriorityComponent;
  let fixture: ComponentFixture<StakeholderPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [StakeholderPriorityComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
