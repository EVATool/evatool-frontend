import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { StakeholderMainComponent } from './stakeholder-main/stakeholder-main.component';
import { CommonModule } from '@angular/common';
import { StakeholderTableComponent } from './components/stakeholder-table/stakeholder-table.component';
import { MatTableModule } from '@angular/material/table';
import { StakeholderPrioComponent } from './components/stakeholder-prio/stakeholder-prio.component';
import { StakeholderLevelComponent } from './components/stakeholder-level/stakeholder-level.component';
import { StakeholderImpactComponent } from './components/stakeholder-impact/stakeholder-impact.component';

@NgModule({
  declarations: [
    StakeholderMainComponent,
    StakeholderTableComponent,
    StakeholderPrioComponent,
    StakeholderLevelComponent,
    StakeholderImpactComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule
  ],
  exports: [
    StakeholderMainComponent
  ]
})
export class StakeholderModule {
}
