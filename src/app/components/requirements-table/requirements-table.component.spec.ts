import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequirementsTableComponent} from './requirements-table.component';
import {SpecService} from '../../services/spec.service';

describe('RequirementsTableComponent', () => {
  let component: RequirementsTableComponent;
  let fixture: ComponentFixture<RequirementsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [ RequirementsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
