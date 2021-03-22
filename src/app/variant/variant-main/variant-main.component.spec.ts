import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantMainComponent } from './variant-main.component';
import {HttpClientModule} from '@angular/common/http';
import {ImpactMainComponent} from '../../impact/impact-main/impact-main.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('VariantMainComponent', () => {
  let component: VariantMainComponent;
  let fixture: ComponentFixture<VariantMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
      ],
      declarations: [ImpactMainComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
