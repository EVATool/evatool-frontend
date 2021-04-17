import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequirementTableFilterBarComponent} from './requirement-table-filter-bar.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('RequirementTableFilterBarComponent', () => {
  let component: RequirementTableFilterBarComponent;
  let fixture: ComponentFixture<RequirementTableFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementTableFilterBarComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementTableFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
