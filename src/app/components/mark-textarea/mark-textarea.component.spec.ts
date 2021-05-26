import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkTextareaComponent} from './mark-textarea.component';
import {SpecService} from '../../services/spec.service';
import {HighlightSearchPipe} from '../../pipes/highlight-search.pipe';

describe('MarkTextareaComponent', () => {
  let component: MarkTextareaComponent;
  let fixture: ComponentFixture<MarkTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [MarkTextareaComponent, HighlightSearchPipe]
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
