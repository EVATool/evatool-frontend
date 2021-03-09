import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';



@NgModule({
  declarations: [DashboardMainComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardMainComponent
  ]
})
export class DashboardModule { }
