import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactsTableComponent} from './impacts-table.component';
import {SpecService} from '../../services/spec.service';

describe('ImpactsTableComponent', () => {
  let component: ImpactsTableComponent;
  let fixture: ComponentFixture<ImpactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
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
