import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValuesDialogComponent} from './values-dialog.component';
import {SpecService} from '../../../../services/spec.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('ValuesDialogComponent', () => {
  let component: ValuesDialogComponent;
  let fixture: ComponentFixture<ValuesDialogComponent>;

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
      declarations: [ValuesDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
