import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTextareaComponent } from './mark-textarea.component';

describe('MarkTextareaComponent', () => {
  let component: MarkTextareaComponent;
  let fixture: ComponentFixture<MarkTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
