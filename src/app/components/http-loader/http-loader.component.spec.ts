import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpLoaderComponent} from './http-loader.component';
import {SpecService} from '../../services/spec.service';

describe('HttpLoaderComponent', () => {
  let component: HttpLoaderComponent;
  let fixture: ComponentFixture<HttpLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: SpecService.providers,
      declarations: [HttpLoaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
