import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariantTypeDialogComponent} from './variant-type-dialog.component';
import {SpecService} from '../../services/spec.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('VariantTypeDialogComponent', () => {
  let component: VariantTypeDialogComponent;
  let fixture: ComponentFixture<VariantTypeDialogComponent>;

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
      ), declarations: [VariantTypeDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
