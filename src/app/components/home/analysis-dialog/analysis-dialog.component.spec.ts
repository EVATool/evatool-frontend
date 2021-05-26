import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisDialogComponent} from './analysis-dialog.component';
import {SpecService} from '../../../services/spec.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Analysis} from '../../../model/Analysis';

describe('AnalysisDialogComponent', () => {
  let component: AnalysisDialogComponent;
  let fixture: ComponentFixture<AnalysisDialogComponent>;

  const data: any = {
    analysis: new Analysis()
  };

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
            useValue: data
          }
        ]
      ),
      declarations: [AnalysisDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
