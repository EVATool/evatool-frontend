import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTypeTableComponent } from './value-type-table.component';

describe('ValueTypeTableComponent', () => {
  let component: ValueTypeTableComponent;
  let fixture: ComponentFixture<ValueTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
