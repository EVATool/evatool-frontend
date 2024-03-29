import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisTileComponent} from './analysis-tile.component';
import {SpecService} from '../../services/spec.service';
import {Analysis} from '../../model/Analysis';

describe('AnalysisTileComponent', () => {
  let component: AnalysisTileComponent;
  let fixture: ComponentFixture<AnalysisTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [AnalysisTileComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTileComponent);
    component = fixture.componentInstance;
    component.analysis = new Analysis();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
