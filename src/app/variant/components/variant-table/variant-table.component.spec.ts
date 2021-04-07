import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTableComponent } from './variant-table.component';
import {RestMockProvidersVariants} from '../../services/spec/RestMockProviders';

describe('VariantTableComponent', () => {
  let component: VariantTableComponent;
  let fixture: ComponentFixture<VariantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: RestMockProvidersVariants.imports,
      providers: RestMockProvidersVariants.providers,
      declarations: [ VariantTableComponent ]
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
