import {NgModule} from '@angular/core';
import {StakeholderMainComponent} from './stakeholder-main/stakeholder-main.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [StakeholderMainComponent],
  imports: [
    CommonModule
  ],
  exports: [
    StakeholderMainComponent
  ]
})
export class StakeholderModule{
}
