import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StakeholderFilterBarComponent} from './stakeholder-filter-bar.component';
import {SpecService} from '../../services/spec.service';

describe('StakeholderFilterBarComponent', () => {
  let component: StakeholderFilterBarComponent;
  let fixture: ComponentFixture<StakeholderFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [StakeholderFilterBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
