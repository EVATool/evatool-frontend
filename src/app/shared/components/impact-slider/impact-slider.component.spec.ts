import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactSliderComponent} from './impact-slider.component';

describe('ImpactSliderComponent', () => {
  let component: ImpactSliderComponent;
  let fixture: ComponentFixture<ImpactSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
