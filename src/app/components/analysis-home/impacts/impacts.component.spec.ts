import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactsComponent} from './impacts.component';
import {SpecService} from '../../../services/spec.service';

describe('ImpactsComponent', () => {
  let component: ImpactsComponent;
  let fixture: ComponentFixture<ImpactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [ImpactsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
