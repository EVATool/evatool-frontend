import {NgModule} from '@angular/core';
import {StakeholderMainComponent} from './stakeholder-main/stakeholder-main.component';
import {CommonModule} from '@angular/common';
import {StakeholderTableComponent} from './components/stakeholder-table/stakeholder-table.component';
import {MatTableModule} from '@angular/material/table';
import {StakeholderPrioComponent} from './components/stakeholder-prio/stakeholder-prio.component';
import {StakeholderLevelComponent} from './components/stakeholder-level/stakeholder-level.component';
import {StakeholderImpactComponent} from './components/stakeholder-impact/stakeholder-impact.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {StakeholderFilterbarComponent} from './components/stakeholder-filterbar/stakeholder-filterbar.component';
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [StakeholderMainComponent, StakeholderTableComponent,  StakeholderPrioComponent,
    StakeholderLevelComponent, StakeholderImpactComponent,  StakeholderFilterbarComponent],
    imports: [
        CommonModule,
        MatTableModule,
        NgScrollbarModule,
        MatInputModule,
        MatSliderModule,
        MatSelectModule
    ],
  exports: [
    StakeholderMainComponent,
  ]
})
export class StakeholderModule{
}
