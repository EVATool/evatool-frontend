import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisMainComponent } from './analysis-main/analysis-main.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { AnalysisDialogComponent } from './analysis-dialog/analysis-dialog.component';

@NgModule({
  declarations: [AnalysisMainComponent, AnalysisDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [
    AnalysisMainComponent
  ]
})
export class AnalysisModule { }
