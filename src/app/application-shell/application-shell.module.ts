import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShellMainComponent } from './shell-main/shell-main.component';
import { ImpactModule } from '../impact/impact.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { RequirementModule } from '../requirement/requirement.module';
import { VariantModule } from '../variant/variant.module';
import { LoginFormComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAnalysisDialogComponent } from './home/create-analysis-dialog/create-analysis-dialog.component';

@NgModule({
  declarations: [ShellMainComponent, LoginFormComponent, HomeComponent, CreateAnalysisDialogComponent],
  imports: [
    CommonModule,
    ImpactModule,
    AnalysisModule,
    RequirementModule,
    VariantModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    ShellMainComponent,
    LoginFormComponent,
    HomeComponent
  ]
})
export class ApplicationShell { }
