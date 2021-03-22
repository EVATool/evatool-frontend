import {NgModule} from '@angular/core';
import {StakeholderMainComponent} from './stakeholder-main/stakeholder-main.component';
import {CommonModule} from '@angular/common';
import {StakeholderTableComponent} from './components/stakeholder-table/stakeholder-table.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [StakeholderMainComponent, StakeholderTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [
    StakeholderMainComponent,
  ]
})
export class StakeholderModule{
}
