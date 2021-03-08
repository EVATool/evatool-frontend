import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantMainComponent } from './variant-main/variant-main.component';

@NgModule({
  declarations: [VariantMainComponent],
  imports: [
    CommonModule
  ],
  exports: [
    VariantMainComponent
  ]
})
export class VariantModule { }
