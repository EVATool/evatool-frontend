import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariantFilterBarComponent} from './variant-filter-bar.component';
import {SpecService} from '../../services/spec.service';

describe('VariantFilterBarComponent', () => {
  let component: VariantFilterBarComponent;
  let fixture: ComponentFixture<VariantFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [VariantFilterBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
