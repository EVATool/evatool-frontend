import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './components/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {AnalysisTileComponent} from './components/home/analysis-tile/analysis-tile.component';
import {AnalysisHomeComponent} from './components/analysis-home/analysis-home.component';
import {StakeholdersComponent} from './components/analysis-home/stakeholders/stakeholders.component';
import {ImpactsComponent} from './components/analysis-home/impacts/impacts.component';
import {RequirementsComponent} from './components/analysis-home/requirements/requirements.component';
import {MatTabsModule} from '@angular/material/tabs';
import {DashboardComponent} from './components/analysis-home/dashboard/dashboard.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {StakeholdersFilterBarComponent} from './components/analysis-home/stakeholders/stakeholders-filter-bar/stakeholders-filter-bar.component';
import {StakeholdersImpactedComponent} from './components/analysis-home/stakeholders/stakeholders-impacted/stakeholders-impacted.component';
import {StakeholdersLevelComponent} from './components/analysis-home/stakeholders/stakeholders-level/stakeholders-level.component';
import {StakeholdersPriorityComponent} from './components/analysis-home/stakeholders/stakeholders-priority/stakeholders-priority.component';
import {StakeholdersTableComponent} from './components/analysis-home/stakeholders/stakeholders-table/stakeholders-table.component';
import {MatSliderModule} from '@angular/material/slider';
import {HighlightSearchPipe} from './pipes/highlight-search.pipe';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {HighlightSearchComponent} from './components/highlight-search/highlight-search.component';
import {ImpactSliderComponent} from './components/impact-slider/impact-slider.component';
import {ColumnSliderFilterComponent} from './components/column-slider-filter/column-slider-filter.component';
import {ColumnCategoryFilterComponent} from './components/column-category-filter/column-category-filter.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {ValuesDialogComponent} from './components/analysis-home/impacts/values-dialog/values-dialog.component';
import {ImpactsFilterBarComponent} from './components/analysis-home/impacts/impacts-filter-bar/impacts-filter-bar.component';
import {ImpactsTableComponent} from './components/analysis-home/impacts/impacts-table/impacts-table.component';
import {ValuesTableComponent} from './components/analysis-home/impacts/values-dialog/values-table/values-table.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RequirementsFilterBarComponent} from './components/analysis-home/requirements/requirements-filter-bar/requirements-filter-bar.component';
import {RequirementsTableComponent} from './components/analysis-home/requirements/requirements-table/requirements-table.component';
import {VariantsDialogComponent} from './components/analysis-home/requirements/variants-dialog/variants-dialog.component';
import {VariantsTableComponent} from './components/analysis-home/requirements/variants-dialog/variants-table/variants-table.component';
import {AddEntityButtonComponent} from './components/analysis-home/add-entity-button/add-entity-button.component';
import {ScrollToTopButtonComponent} from './components/analysis-home/scroll-to-top-button/scroll-to-top-button.component';
import {MarkTextareaComponent} from './components/mark-textarea/mark-textarea.component';
import {AnalysisDialogComponent} from './components/home/analysis-dialog/analysis-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ImpactedFilterComponent} from './components/impacted-filter/impacted-filter.component';
import {PriorityFilterComponent} from './components/priority-filter/priority-filter.component';
import {PluckPipe} from './pipes/pluck.pipe';
import {NgVarDirective} from './directives/ng-var.directive';
// noinspection ES6UnusedImports
import {} from 'jasmine'; // Because we are using jest and karma + jasmine

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AnalysisTileComponent,
    AnalysisHomeComponent,
    StakeholdersComponent,
    ImpactsComponent,
    RequirementsComponent,
    DashboardComponent,
    ImprintComponent,
    PrivacyComponent,
    StakeholdersFilterBarComponent,
    StakeholdersImpactedComponent,
    StakeholdersLevelComponent,
    StakeholdersPriorityComponent,
    StakeholdersTableComponent,
    HighlightSearchPipe,
    PluckPipe,
    NgVarDirective,
    HighlightSearchComponent,
    ColumnSliderFilterComponent,
    ColumnCategoryFilterComponent,
    ImpactSliderComponent,
    ValuesDialogComponent,
    ImpactsFilterBarComponent,
    ImpactsTableComponent,
    ValuesTableComponent,
    RequirementsFilterBarComponent,
    RequirementsTableComponent,
    VariantsDialogComponent,
    VariantsTableComponent,
    AddEntityButtonComponent,
    ScrollToTopButtonComponent,
    MarkTextareaComponent,
    AnalysisDialogComponent,
    ImpactedFilterComponent,
    PriorityFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatSliderModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    NgScrollbarModule,
    MatSortModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
