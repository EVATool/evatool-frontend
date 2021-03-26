import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionDialogComponent } from './dimension-dialog.component';

describe('DimensionDialogComponent', () => {
  let component: DimensionDialogComponent;
  let fixture: ComponentFixture<DimensionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimensionDialogComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers: [FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
