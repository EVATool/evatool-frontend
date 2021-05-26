import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariantsDialogComponent} from './variants-dialog.component';
import {SpecService} from '../../../../services/spec.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('VariantsDialogComponent', () => {
  let component: VariantsDialogComponent;
  let fixture: ComponentFixture<VariantsDialogComponent>;

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
      declarations: [VariantsDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
