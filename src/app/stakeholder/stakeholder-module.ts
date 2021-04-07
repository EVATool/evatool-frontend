import { NgModule } from '@angular/core';
import { StakeholderMainComponent } from './stakeholder-main/stakeholder-main.component';
import { CommonModule } from '@angular/common';
import { StakeholderTableComponent } from './components/stakeholder-table/stakeholder-table.component';
import { MatTableModule } from '@angular/material/table';
import { StakeholderPrioComponent } from './components/stakeholder-prio/stakeholder-prio.component';
import { StakeholderLevelComponent } from './components/stakeholder-level/stakeholder-level.component';
import { StakeholderImpactComponent } from './components/stakeholder-impact/stakeholder-impact.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { StakeholderFilterbarComponent } from './components/stakeholder-filterbar/stakeholder-filterbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {SharedModule} from '../shared/shared.module';
import {MatListModule} from '@angular/material/list';
import {HighlightSearchPipe} from '../shared/pipes/highlightSearch/highlight-search.pipe';

@NgModule({
  declarations: [StakeholderMainComponent, StakeholderTableComponent, StakeholderPrioComponent,
    StakeholderLevelComponent, StakeholderImpactComponent, StakeholderFilterbarComponent, HighlightSearchPipe],
  imports: [
    CommonModule,
    MatTableModule,
    NgScrollbarModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    SharedModule,
    MatListModule
  ],
  exports: [
    StakeholderMainComponent
  ]
})
export class StakeholderModule {
}
