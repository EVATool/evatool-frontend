import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTableComponent } from './value-table.component';
import {SpecService} from '../../services/spec.service';

describe('ValueTableComponent', () => {
  let component: ValueTableComponent;
  let fixture: ComponentFixture<ValueTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [ ValueTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
