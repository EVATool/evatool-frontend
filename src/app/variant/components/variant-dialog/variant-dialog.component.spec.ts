import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantDialogComponent } from './variant-dialog.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';

describe('VariantDialogComponent', () => {
  let component: VariantDialogComponent;
  let fixture: ComponentFixture<VariantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantDialogComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule,
        HttpClientModule,

      ],
      providers: [FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: HttpClientModule}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
