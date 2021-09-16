import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './components/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {AnalysisTileComponent} from './components/analysis-tile/analysis-tile.component';
import {AnalysisEditComponent} from './components/analysis-edit/analysis-edit.component';
import {StakeholderEditComponent} from './components/stakeholder-edit/stakeholder-edit.component';
import {ImpactEditComponent} from './components/impact-edit/impact-edit.component';
import {RequirementEditComponent} from './components/requirement-edit/requirement-edit.component';
import {MatTabsModule} from '@angular/material/tabs';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {StakeholderFilterBarComponent} from './components/stakeholder-filter-bar/stakeholder-filter-bar.component';
import {StakeholderImpactedComponent} from './components/stakeholder-impacted/stakeholder-impacted.component';
import {StakeholderLevelComponent} from './components/stakeholder-level/stakeholder-level.component';
import {StakeholderPriorityComponent} from './components/stakeholder-priority/stakeholder-priority.component';
import {StakeholderTableComponent} from './components/stakeholder-table/stakeholder-table.component';
import {MatSliderModule} from '@angular/material/slider';
import {HighlightSearchPipe} from './pipes/highlight-search.pipe';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {HighlightSearchComponent} from './components/highlight-search/highlight-search.component';
import {ImpactSliderComponent} from './components/impact-slider/impact-slider.component';
import {FilterSliderComponent} from './components/filter-impact/filter-slider.component';
import {FilterCategoryComponent} from './components/filter-category/filter-category.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {ValueDialogComponent} from './components/value-dialog/value-dialog.component';
import {ImpactFilterBarComponent} from './components/impact-filter-bar/impact-filter-bar.component';
import {ImpactTableComponent} from './components/impact-table/impact-table.component';
import {ValueTableComponent} from './components/value-table/value-table.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatSortModule} from '@angular/material/sort';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RequirementFilterBarComponent} from './components/requirement-filter-bar/requirement-filter-bar.component';
import {RequirementTableComponent} from './components/requirement-table/requirement-table.component';
import {VariantDialogComponent} from './components/variant-dialog/variant-dialog.component';
import {VariantTableComponent} from './components/variant-table/variant-table.component';
import {AddEntityButtonComponent} from './components/add-entity-button/add-entity-button.component';
import {ScrollToTopButtonComponent} from './components/scroll-to-top-button/scroll-to-top-button.component';
import {HighlightTextareaComponent} from './components/highlight-textarea/highlight-textarea.component';
import {AnalysisDialogComponent} from './components/analysis-dialog/analysis-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FilterPriorityComponent} from './components/filter-priority/filter-priority.component';
import {PluckPipe} from './pipes/pluck.pipe';
import {NgVarDirective} from './directives/ng-var.directive';
// noinspection ES6UnusedImports
import {} from 'jasmine'; // Because we are using jest and karma + jasmine
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpLoaderComponent} from './components/http-loader/http-loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {FlexModule} from '@angular/flex-layout';
import {LoginComponent} from './components/login/login.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {AuthRemainingComponent} from './components/auth-remaining/auth-remaining.component';
import {TitlePageComponent} from './components/title-page/title-page.component';
import {TimeOutComponent} from './components/time-out/time-out.component';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {RealmAdministrationComponent} from './components/realm-administration/realm-administration.component';
import {XsrfInterceptor} from './services/auth/xsrf-interceptor.service';
import {HttpInterceptorService} from './services/http/http-interceptor.service';
import {AuthInterceptorService} from './services/auth/auth-interceptor.service';
import {FormatPipe} from './pipes/format.pipe';
import { ResizeColumnDirective } from './directives/resize-column.directive';

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
    StakeholderEditComponent,
    ImpactEditComponent,
    RequirementEditComponent,
    DashboardComponent,
    ImprintComponent,
    PrivacyComponent,
    StakeholderFilterBarComponent,
    StakeholderImpactedComponent,
    StakeholderLevelComponent,
    StakeholderPriorityComponent,
    StakeholderTableComponent,
    HighlightSearchPipe,
    PluckPipe,
    NgVarDirective,
    HighlightSearchComponent,
    FilterSliderComponent,
    FilterCategoryComponent,
    ImpactSliderComponent,
    ValueDialogComponent,
    ImpactFilterBarComponent,
    ImpactTableComponent,
    ValueTableComponent,
    RequirementFilterBarComponent,
    RequirementTableComponent,
    VariantDialogComponent,
    VariantTableComponent,
    AddEntityButtonComponent,
    ScrollToTopButtonComponent,
    HighlightTextareaComponent,
    AnalysisDialogComponent,
    FilterPriorityComponent,
    ConfirmationDialogComponent,
    HttpLoaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    AccessDeniedComponent,
    AuthRemainingComponent,
    TitlePageComponent,
    TimeOutComponent,
    TermsAndConditionsComponent,
    ForgotPasswordComponent,
    RealmAdministrationComponent,
    FormatPipe,
    ResizeColumnDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatProgressSpinnerModule,
    FlexModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XsrfInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
