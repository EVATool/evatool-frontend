import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariantsTableComponent} from './variants-table.component';
import {SpecService} from '../../../../../services/spec.service';

describe('VariantsTableComponent', () => {
  let component: VariantsTableComponent;
  let fixture: ComponentFixture<VariantsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [ VariantsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
