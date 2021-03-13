import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantMainComponent } from './variant-main/variant-main.component';
import { VariantDialogComponent } from './variant-dialog/variant-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [VariantMainComponent, VariantDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  exports: [
    VariantMainComponent
  ]
})
export class VariantModule { }
