import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTypeDialogComponent } from './variant-type-dialog.component';

describe('VariantTypeDialogComponent', () => {
  let component: VariantTypeDialogComponent;
  let fixture: ComponentFixture<VariantTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantTypeDialogComponent ]
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
