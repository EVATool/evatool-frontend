import {HighlightSearch} from './pipes/HighlightSearch';
import {ValueTableComponent} from './components/impact-table/components/value-dialog/components/value-table/value-table.component';
import {ValueDialogComponent} from './components/impact-table/components/value-dialog/value-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImpactMainComponent} from './impact-main/impact-main.component';
import {ImpactTableComponent} from './components/impact-table/impact-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClickOutsideDirective} from './directives/ClickOutsideDirective';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ImpactTableFilterBarComponent} from './components/impact-table-filter-bar/impact-table-filter-bar.component';
import {StakeholderModule} from "../stakeholder/stakeholder-module";
import {ResizeColumnDirective} from "./directives/ResizeColumnDirective";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ImpactMainComponent,
    ImpactTableComponent,
    ClickOutsideDirective,
    ValueDialogComponent,
    ValueTableComponent,
    ImpactTableFilterBarComponent,
    HighlightSearch,
    ResizeColumnDirective
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
    StakeholderModule,
    MatSnackBarModule
  ],
  exports: [
    ImpactMainComponent,
    ImpactTableFilterBarComponent
  ]
})
export class ImpactModule {
}
