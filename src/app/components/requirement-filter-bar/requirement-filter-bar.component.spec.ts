import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequirementFilterBarComponent} from './requirement-filter-bar.component';
import {SpecService} from '../../services/spec.service';

describe('RequirementFilterBarComponent', () => {
  let component: RequirementFilterBarComponent;
  let fixture: ComponentFixture<RequirementFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [RequirementFilterBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
