import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisMainComponent } from './analysis-main/analysis-main.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {AnalysisDialogComponent } from './analysis-dialog/analysis-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import { ValueDialogComponent } from './value-dialog/value-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from '@angular/material/input';
import {NgScrollbarModule} from "ngx-scrollbar";

@NgModule({
  declarations: [AnalysisMainComponent, AnalysisDialogComponent, ValueDialogComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatExpansionModule,
        MatDialogModule,
        MatInputModule,
        NgScrollbarModule
    ],
  exports: [
    AnalysisMainComponent
  ]
})
export class AnalysisModule { }
