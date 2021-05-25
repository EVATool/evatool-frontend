import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesTableComponent } from './values-table.component';

describe('ValuesTableComponent', () => {
  let component: ValuesTableComponent;
  let fixture: ComponentFixture<ValuesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
