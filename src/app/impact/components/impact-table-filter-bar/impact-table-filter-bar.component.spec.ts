import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactTableFilterBarComponent } from './impact-table-filter-bar.component';

describe('ImpactTableFilterBarComponent', () => {
  let component: ImpactTableFilterBarComponent;
  let fixture: ComponentFixture<ImpactTableFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactTableFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactTableFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
