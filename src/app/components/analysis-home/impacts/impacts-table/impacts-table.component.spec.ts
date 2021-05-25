import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactsTableComponent } from './impacts-table.component';

describe('ImpactsTableComponent', () => {
  let component: ImpactsTableComponent;
  let fixture: ComponentFixture<ImpactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
