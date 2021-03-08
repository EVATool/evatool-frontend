import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisMainComponent } from './analysis-main/analysis-main.component';

@NgModule({
  declarations: [AnalysisMainComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AnalysisMainComponent
  ]
})
export class AnalysisModule { }
