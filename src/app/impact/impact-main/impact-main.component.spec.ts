import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactMainComponent } from './impact-main.component';

describe('ImpactMainComponent', () => {
  let component: ImpactMainComponent;
  let fixture: ComponentFixture<ImpactMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImpactMainComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
