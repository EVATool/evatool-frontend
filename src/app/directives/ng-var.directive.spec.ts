import {NgVarDirective} from './ng-var.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

@Component({
  template: `
    <h2 *ngVar="4 as x"></h2>`
})
class TestComponent {
}

describe('NgVarDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [NgVarDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should create an instance', () => {

  });

  it('should declare variable', () => {

  });
});
