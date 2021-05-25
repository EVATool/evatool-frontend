import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsFilterBarComponent } from './requirements-filter-bar.component';
import {SpecService} from '../../../../services/spec.service';

describe('RequirementsFilterBarComponent', () => {
  let component: RequirementsFilterBarComponent;
  let fixture: ComponentFixture<RequirementsFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [ RequirementsFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
