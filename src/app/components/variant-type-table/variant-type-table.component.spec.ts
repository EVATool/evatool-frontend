import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTypeTableComponent } from './variant-type-table.component';
import {SpecService} from '../../services/spec.service';

describe('VariantTypeTableComponent', () => {
  let component: VariantTypeTableComponent;
  let fixture: ComponentFixture<VariantTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [ VariantTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
