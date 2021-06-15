import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {SpecService} from '../services/spec.service';
import {MatDialogRef} from '@angular/material/dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers.concat([
          {
            provide: MatDialogRef,
            useValue: []
          }
        ]
      ),
      declarations: [ConfirmationDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
