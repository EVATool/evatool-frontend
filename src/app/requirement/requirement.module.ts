import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementMainComponent } from './requirement-main/requirement-main.component';
import { RequirementsTableComponent } from './components/requirement-table/requirements-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

@NgModule({
  declarations: [RequirementMainComponent, RequirementsTableComponent],
    imports: [
      CommonModule,
      MatTableModule,
      MatSelectModule,
      FormsModule,
      MatSliderModule,
      HttpClientModule,
      MatSortModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      KeyboardShortcutsModule.forRoot()
    ],
  exports: [
    RequirementMainComponent
  ]
})
export class RequirementModule { }
