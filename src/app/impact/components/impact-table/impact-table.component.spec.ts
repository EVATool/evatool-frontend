import {HighlightSearch} from '../../pipes/HighlightSearch';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {ImpactTableComponent} from './impact-table.component';
import {RestMock} from "../../spec/RestMock";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('ImpactTableComponent', () => {
  let component: ImpactTableComponent;
  let fixture: ComponentFixture<ImpactTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: RestMock.imports.concat([HttpClientModule, MatDialogModule, BrowserAnimationsModule, MatSnackBarModule]),
      declarations: [ImpactTableComponent, HighlightSearch],
      providers: [FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}].concat(RestMock.providers)
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
