import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisHomeComponent} from './analysis-home.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('AnalysisHomeComponent', () => {
  let component: AnalysisHomeComponent;
  let fixture: ComponentFixture<AnalysisHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AnalysisHomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
