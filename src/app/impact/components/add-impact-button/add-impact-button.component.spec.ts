import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AddImpactButtonComponent } from './add-impact-button.component';

describe('AddImpactButtonComponent', () => {
  let component: AddImpactButtonComponent;
  let fixture: ComponentFixture<AddImpactButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImpactButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImpactButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have \'+\' on button', () => {
    expect(fixture.debugElement.query(By.css('#plus')).nativeElement.textContent).toContain('+');
  })

  it('should have \'Impact\' as text', () => {
    expect(fixture.debugElement.query(By.css('#text')).nativeElement.textContent).toEqual('Impact');
  })

  it('should emit click event', () => {
    // Arrange
    spyOn(component.addButtonClick, 'emit');

    // Act
    component.addButtonClicked();

    // Assert
    expect(component.addButtonClick.emit).toHaveBeenCalled();
  });

  it('should emit click event on button click', () => {
    // Arrange
    spyOn(component.addButtonClick, 'emit');

    // Act
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    // Assert
    fixture.whenStable().then(() => {
      expect(component.addButtonClick).toHaveBeenCalled();
    });
  });
});
