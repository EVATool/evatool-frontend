import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpactMainComponent } from './impact-main/impact-main.component';
import { ImpactTableComponent } from './components/impact-table/impact-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ImpactMainComponent, ImpactTableComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    ImpactMainComponent
  ]
})
export class ImpactModule { }
