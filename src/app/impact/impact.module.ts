import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpactMainComponent } from './impact-main/impact-main.component';
import { ImpactTableComponent } from './components/impact-table/impact-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddImpactButtonComponent } from './components/add-impact-button/add-impact-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClickOutsideDirective } from './directives/ClickOutsideDirective';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ImpactSliderComponent } from './components/impact-slider/impact-slider.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [ImpactMainComponent, ImpactTableComponent, AddImpactButtonComponent, ClickOutsideDirective, ImpactSliderComponent, SearchBarComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    HttpClientModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgScrollbarModule
  ],
  exports: [
    ImpactMainComponent
  ]
})
export class ImpactModule { }
