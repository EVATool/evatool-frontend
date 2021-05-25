import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesTableComponent } from './values-table.component';
import {SpecService} from '../../../../../services/spec.service';

describe('ValuesTableComponent', () => {
  let component: ValuesTableComponent;
  let fixture: ComponentFixture<ValuesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
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
