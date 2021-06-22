import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactsFilterBarComponent} from './impacts-filter-bar.component';
import {SpecService} from '../../services/spec.service';

describe('ImpactsFilterBarComponent', () => {
  let component: ImpactsFilterBarComponent;
  let fixture: ComponentFixture<ImpactsFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      declarations: [ ImpactsFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactsFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
