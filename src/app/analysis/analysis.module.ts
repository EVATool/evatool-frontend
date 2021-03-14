import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisMainComponent } from './analysis-main/analysis-main.component';
import {StakeholderDialogComponent} from './stakeholder-dialog/stakeholder-dialog.component';

@NgModule({
  declarations: [AnalysisMainComponent, StakeholderDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AnalysisMainComponent
  ]
})
export class AnalysisModule { }
