import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactFilterBarComponent} from './impact-filter-bar.component';
import {SpecService} from '../../services/spec.service';

describe('ImpactsFilterBarComponent', () => {
  let component: ImpactFilterBarComponent;
  let fixture: ComponentFixture<ImpactFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [ ImpactFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
