import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariantTableComponent} from './variant-table.component';
import {SpecService} from '../../../services/spec.service';

describe('VariantTableComponent', () => {
  let component: VariantTableComponent;
  let fixture: ComponentFixture<VariantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [VariantTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
