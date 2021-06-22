import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequirementEditComponent} from './requirement-edit.component';
import {SpecService} from '../../services/spec.service';

describe('RequirementsComponent', () => {
  let component: RequirementEditComponent;
  let fixture: ComponentFixture<RequirementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [RequirementEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
