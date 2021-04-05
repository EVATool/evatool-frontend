import {HighlightSearch} from '../../pipes/HighlightSearch';
import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactTableFilterBarComponent} from './impact-table-filter-bar.component';
import {RestMockProviders} from "../../spec/RestMockProviders";

describe('ImpactTableFilterBarComponent', () => {
  let component: ImpactTableFilterBarComponent;
  let fixture: ComponentFixture<ImpactTableFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImpactTableFilterBarComponent, HighlightSearch],
      imports: RestMockProviders.imports,
      providers: RestMockProviders.providers
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactTableFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
