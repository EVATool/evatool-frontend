import {NgModule} from '@angular/core';
import {StakeholderMainComponent} from './stakeholder-main/stakeholder-main.component';
import {CommonModule} from '@angular/common';
import {AppModule} from "../app.module";

@NgModule({
  declarations: [StakeholderMainComponent],
  imports: [
    CommonModule,
    AppModule
  ],
  exports: [
    StakeholderMainComponent
  ]
})
export class StakeholderModule{
}
