import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementMainComponent } from './requirement-main.component';

describe('RequirementMainComponent', () => {
  let component: RequirementMainComponent;
  let fixture: ComponentFixture<RequirementMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
