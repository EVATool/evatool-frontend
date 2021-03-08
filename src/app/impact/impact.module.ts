import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpactMainComponent } from './impact-main/impact-main.component';

@NgModule({
  declarations: [ImpactMainComponent],
  imports: [
    CommonModule
  ], 
  exports: [
    ImpactMainComponent
  ]
})
export class ImpactModule { }
