import {HttpClientModule} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValueDialogComponent} from './value-dialog.component';
import {RestMockProviders} from "../../../../spec/RestMockProviders";

describe('ValueDialogComponent', () => {
  let component: ValueDialogComponent;
  let fixture: ComponentFixture<ValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValueDialogComponent],
      imports: RestMockProviders.imports.concat([MatDialogModule, HttpClientModule]),
      providers: [FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
