import { HighlightSearch } from './../pipes/HighlightSearch';
import { RouterTestingModule } from '@angular/router/testing';
import { NgScrollbar } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactMainComponent } from './impact-main.component';

describe('ImpactMainComponent', () => {
  let component: ImpactMainComponent;
  let fixture: ComponentFixture<ImpactMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ImpactMainComponent, HighlightSearch],
      providers: [NgScrollbar]
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
