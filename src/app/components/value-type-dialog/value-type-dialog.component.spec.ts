import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValueTypeDialogComponent} from './value-type-dialog.component';
import {SpecService} from '../../services/spec.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('ValueTypeDialogComponent', () => {
  let component: ValueTypeDialogComponent;
  let fixture: ComponentFixture<ValueTypeDialogComponent>;

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
      ), declarations: [ValueTypeDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
