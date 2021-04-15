import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ValueTemplateComponent} from './value-template.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HighlightSearch} from '../../impact/pipes/HighlightSearch';
import {RouterTestingModule} from '@angular/router/testing';

describe('ValueDialogTemplateComponent', () => {
  let component: ValueTemplateComponent;
  let fixture: ComponentFixture<ValueTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValueTemplateComponent, HighlightSearch],
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
    fixture = TestBed.createComponent(ValueTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
