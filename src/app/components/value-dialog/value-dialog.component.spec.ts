import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValueDialogComponent} from './value-dialog.component';
import {SpecService} from '../../services/spec.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('ValueDialogComponent', () => {
  let component: ValueDialogComponent;
  let fixture: ComponentFixture<ValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers.concat([
          {
            provide: MatDialogRef,
            useValue: []
          },
          {
            provide: MAT_DIALOG_DATA,
            useValue: []
          }
        ]
      ),
      declarations: [ValueDialogComponent]
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
