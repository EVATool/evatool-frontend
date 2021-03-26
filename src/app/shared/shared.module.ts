import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpactSliderComponent } from './components/impact-slider/impact-slider.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    ImpactSliderComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports:[
    ImpactSliderComponent,
    SearchBarComponent
  ]
})
export class SharedModule { }
