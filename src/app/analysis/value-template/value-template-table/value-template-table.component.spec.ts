import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTemplateTableComponent } from './value-template-table.component';

describe('ValueTemplateTableComponent', () => {
  let component: ValueTemplateTableComponent;
  let fixture: ComponentFixture<ValueTemplateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueTemplateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTemplateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
