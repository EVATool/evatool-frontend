import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisEditComponent} from './analysis-edit.component';
import {SpecService} from '../../services/spec.service';

describe('AnalysisHomeComponent', () => {
  let component: AnalysisEditComponent;
  let fixture: ComponentFixture<AnalysisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [AnalysisEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
