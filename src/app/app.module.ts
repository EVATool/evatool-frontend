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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {AnalysisTileComponent} from './components/analysis-tile/analysis-tile.component';
import {AnalysisEditComponent} from './components/analysis-edit/analysis-edit.component';
import {StakeholdersComponent} from './components/stakeholders/stakeholders.component';
import {ImpactsComponent} from './components/impacts/impacts.component';
import {RequirementsComponent} from './components/requirements/requirements.component';
import {MatTabsModule} from '@angular/material/tabs';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {StakeholdersFilterBarComponent} from './components/stakeholders-filter-bar/stakeholders-filter-bar.component';
import {StakeholdersImpactedComponent} from './components/stakeholders-impacted/stakeholders-impacted.component';
import {StakeholdersLevelComponent} from './components/stakeholders-level/stakeholders-level.component';
import {StakeholdersPriorityComponent} from './components/stakeholders-priority/stakeholders-priority.component';
import {StakeholdersTableComponent} from './components/stakeholders-table/stakeholders-table.component';
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
import {ValuesDialogComponent} from './components/values-dialog/values-dialog.component';
import {ImpactsFilterBarComponent} from './components/impacts-filter-bar/impacts-filter-bar.component';
import {ImpactsTableComponent} from './components/impacts-table/impacts-table.component';
import {ValuesTableComponent} from './components/values-table/values-table.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatSortModule} from '@angular/material/sort';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RequirementsFilterBarComponent} from './components/requirements-filter-bar/requirements-filter-bar.component';
import {RequirementsTableComponent} from './components/requirements-table/requirements-table.component';
import {VariantsDialogComponent} from './components/variants-dialog/variants-dialog.component';
import {VariantsTableComponent} from './components/variants-table/variants-table.component';
import {AddEntityButtonComponent} from './components/add-entity-button/add-entity-button.component';
import {ScrollToTopButtonComponent} from './components/scroll-to-top-button/scroll-to-top-button.component';
import {MarkTextareaComponent} from './components/mark-textarea/mark-textarea.component';
import {AnalysisDialogComponent} from './components/analysis-dialog/analysis-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PriorityFilterComponent} from './components/priority-filter/priority-filter.component';
import {PluckPipe} from './pipes/pluck.pipe';
import {NgVarDirective} from './directives/ng-var.directive';
// noinspection ES6UnusedImports
import {} from 'jasmine'; // Because we are using jest and karma + jasmine
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {HttpLoaderComponent} from './components/http-loader/http-loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export const customTooltipDefaults: MatTooltipDefaultOptions = {
  position: 'above',
  showDelay: 100,
  hideDelay: 100,
  touchendHideDelay: 100
};

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AnalysisTileComponent,
    AnalysisEditComponent,
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
    PriorityFilterComponent,
    ConfirmationDialogComponent,
    HttpLoaderComponent
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: customTooltipDefaults
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
