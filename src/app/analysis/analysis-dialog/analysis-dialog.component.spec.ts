import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisDialogComponent} from './analysis-dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('AnalysisDialogComponent', () => {
  let component: AnalysisDialogComponent;
  let fixture: ComponentFixture<AnalysisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatDialogModule, MatSnackBarModule],
      declarations: [AnalysisDialogComponent],
      providers: [FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
