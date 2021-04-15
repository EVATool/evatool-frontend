import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {HighlightSearchComponent} from './highlight-search.component';

describe('SearchBarComponent', () => {
  let component: HighlightSearchComponent;
  let fixture: ComponentFixture<HighlightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightSearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire \'searchTextChanged\' event', () => {
    // Arrange
    spyOn(component.searchTextChanged, 'emit');

    // Act
    const searchBar = fixture.debugElement.query(By.css('.highlight-text')).nativeElement;
    searchBar.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(component.searchTextChanged.emit).toHaveBeenCalled();
  });
});
