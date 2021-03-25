import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
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
    const searchBar = fixture.debugElement.query(By.css('#search-desc')).nativeElement;
    searchBar.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(component.searchTextChanged.emit).toHaveBeenCalled();
  });
});
