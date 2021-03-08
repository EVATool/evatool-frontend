import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementMainComponent } from './requirement-main/requirement-main.component';

@NgModule({
  declarations: [RequirementMainComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RequirementMainComponent
  ]
})
export class RequirementModule { }
