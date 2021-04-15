import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImpactSliderComponent} from './components/impact-slider/impact-slider.component';
import {HighlightSearchComponent} from './components/search-bar/highlight-search.component';
import {MatInputModule} from '@angular/material/input';
import {ColumnCategoryFilterComponent} from './components/column-category-filter/column-category-filter.component';
import {ColumnSliderFilterComponent} from './components/column-slider-filter/column-slider-filter.component';

@NgModule({
  declarations: [
    ColumnCategoryFilterComponent,
    ColumnSliderFilterComponent,
    ImpactSliderComponent,
    HighlightSearchComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatInputModule
  ],
  exports: [
    ImpactSliderComponent,
    HighlightSearchComponent,
    ColumnCategoryFilterComponent,
    ColumnSliderFilterComponent
  ]
})
export class SharedModule { }
