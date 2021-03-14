import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {StakeholderMainComponent} from './stakeholder-main/stakeholder-main.component';

@NgModule({
  declarations: [StakeholderMainComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [
    StakeholderMainComponent
  ]
})
export class StakeholderModule{
}
