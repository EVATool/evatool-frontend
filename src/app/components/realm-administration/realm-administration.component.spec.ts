import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmAdministrationComponent } from './realm-administration.component';

describe('RealmAdministrationComponent', () => {
  let component: RealmAdministrationComponent;
  let fixture: ComponentFixture<RealmAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmAdministrationComponent ]
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
