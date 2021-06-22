import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequirementTableComponent} from './requirement-table.component';
import {SpecService} from '../../services/spec.service';

describe('RequirementsTableComponent', () => {
  let component: RequirementTableComponent;
  let fixture: ComponentFixture<RequirementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [ RequirementTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
