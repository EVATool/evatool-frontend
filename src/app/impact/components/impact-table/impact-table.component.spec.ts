import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactTableComponent } from './impact-table.component';

describe('ImpactTableComponent', () => {
  let component: ImpactTableComponent;
  let fixture: ComponentFixture<ImpactTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
