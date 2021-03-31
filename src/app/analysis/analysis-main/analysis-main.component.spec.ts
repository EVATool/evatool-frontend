import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// @ts-ignore
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisMainComponent } from './analysis-main.component';

describe('AnalysisMainComponent', () => {
  let component: AnalysisMainComponent;
  let fixture: ComponentFixture<AnalysisMainComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, RouterTestingModule],
      declarations: [AnalysisMainComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
