import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesDialogComponent } from './values-dialog.component';

describe('ValuesDialogComponent', () => {
  let component: ValuesDialogComponent;
  let fixture: ComponentFixture<ValuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuesDialogComponent ]
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
