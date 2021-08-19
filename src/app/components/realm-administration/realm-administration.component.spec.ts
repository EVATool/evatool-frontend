import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RealmAdministrationComponent} from './realm-administration.component';
import {SpecService} from '../../services/spec.service';

describe('RealmAdministrationComponent', () => {
  let component: RealmAdministrationComponent;
  let fixture: ComponentFixture<RealmAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [RealmAdministrationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
