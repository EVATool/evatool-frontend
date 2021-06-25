import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HighlightTextareaComponent} from './highlight-textarea.component';
import {SpecService} from '../../services/spec.service';
import {HighlightSearchPipe} from '../../pipes/highlight-search.pipe';

describe('HighlightTextareaComponent', () => {
  let component: HighlightTextareaComponent;
  let fixture: ComponentFixture<HighlightTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [HighlightTextareaComponent, HighlightSearchPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
