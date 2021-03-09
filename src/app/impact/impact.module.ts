import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpactMainComponent } from './impact-main/impact-main.component';
import { ImpactTableComponent } from './components/impact-table/impact-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [ImpactMainComponent, ImpactTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    HttpClientModule
  ],
  exports: [
    ImpactMainComponent
  ]
})
export class ImpactModule { }
