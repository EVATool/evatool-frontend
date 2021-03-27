import { HighlightSearch } from './pipes/HighlightSearch';
import { DimensionTableComponent } from './components/impact-table/components/dimension-dialog/components/dimension-table/dimension-table.component';
import { DimensionDialogComponent } from './components/impact-table/components/dimension-dialog/dimension-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpactMainComponent } from './impact-main/impact-main.component';
import { ImpactTableComponent } from './components/impact-table/impact-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddImpactButtonComponent } from './components/add-impact-button/add-impact-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClickOutsideDirective } from './directives/ClickOutsideDirective';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImpactTableFilterBarComponent } from './components/impact-table-filter-bar/impact-table-filter-bar.component';

@NgModule({
  declarations: [
    ImpactMainComponent,
    ImpactTableComponent,
    AddImpactButtonComponent,
    ClickOutsideDirective,
    DimensionDialogComponent,
    DimensionTableComponent,
    ImpactTableFilterBarComponent,
    HighlightSearch
  ],
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
    ReactiveFormsModule,
    MatTooltipModule,
    NgScrollbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    RouterModule,
    SharedModule,
    RouterModule,
    MatListModule,
    NgMultiSelectDropDownModule,
  ],
  exports: [
    ImpactMainComponent
  ]
})
export class ImpactModule { }
