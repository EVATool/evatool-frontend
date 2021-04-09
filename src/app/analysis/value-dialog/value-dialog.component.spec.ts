import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueDialogComponent } from './value-dialog.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

describe('ValueDialogComponent', () => {
  let component: ValueDialogComponent;
  let fixture: ComponentFixture<ValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ValueDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
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
