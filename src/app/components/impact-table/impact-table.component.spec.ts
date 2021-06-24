import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactTableComponent} from './impact-table.component';
import {SpecService} from '../../services/spec.service';

describe('ImpactTableComponent', () => {
  let component: ImpactTableComponent;
  let fixture: ComponentFixture<ImpactTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
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
