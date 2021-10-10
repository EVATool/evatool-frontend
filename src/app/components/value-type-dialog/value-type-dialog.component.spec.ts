import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTypeDialogComponent } from './value-type-dialog.component';

describe('ValueTypeDialogComponent', () => {
  let component: ValueTypeDialogComponent;
  let fixture: ComponentFixture<ValueTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueTypeDialogComponent ]
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
