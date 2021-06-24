import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpactEditComponent} from './impact-edit.component';
import {SpecService} from '../../services/spec.service';

describe('ImpactEditComponent', () => {
  let component: ImpactEditComponent;
  let fixture: ComponentFixture<ImpactEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [ImpactEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
