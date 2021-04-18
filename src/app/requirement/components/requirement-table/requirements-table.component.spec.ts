import {RouterTestingModule} from '@angular/router/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {RequirementsTableComponent} from './requirements-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RestMockProvidersRequirements} from '../../services/spec/RestMockProviders';

describe('RequirementsTableComponent', () => {
  let component: RequirementsTableComponent;
  let fixture: ComponentFixture<RequirementsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, MatDialogModule, RestMockProvidersRequirements.imports],
      providers: RestMockProvidersRequirements.providers,
      declarations: [RequirementsTableComponent]
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
