import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AnalysisEditComponent} from './components/analysis-edit/analysis-edit.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ROUTES, TAB_ROUTES} from './app-routes';
import {LoginComponent} from './components/login/login.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {TitlePageComponent} from './components/title-page/title-page.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {TimeOutComponent} from './components/time-out/time-out.component';
import {RealmAdministrationComponent} from './components/realm-administration/realm-administration.component';
import {UserSettingsComponent} from './components/user-settings/user-settings.component';
import {StakeholderEditComponent} from './components/stakeholder-edit/stakeholder-edit.component';
import {OUTLETS} from './app-outlets';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RequirementEditComponent} from './components/requirement-edit/requirement-edit.component';
import {VariantEditComponent} from './components/variant-edit/variant-edit.component';
import {ImpactEditComponent} from './components/impact-edit/impact-edit.component';
import {ValueEditComponent} from './components/value-edit/value-edit.component';

const routes: Routes = [
  {
    path: ROUTES.home,
    component: HomeComponent
  },
  {
    path: ROUTES.title,
    component: TitlePageComponent
  },
  {
    path: ROUTES.login,
    component: LoginComponent
  },
  {
    path: ROUTES.realmAdministration,
    component: RealmAdministrationComponent
  },
  {
    path: ROUTES.forgotPassword,
    component: ForgotPasswordComponent
  },
  {
    path: ROUTES.termsAndConditions,
    component: TermsAndConditionsComponent
  },
  {
    path: ROUTES.timeOut,
    component: TimeOutComponent
  },
  {
    path: ROUTES.accessDenied,
    component: AccessDeniedComponent
  },
  {
    path: ROUTES.analysisWithId,
    component: AnalysisEditComponent,
    children: [
      // {
      //   path: '', // TODO default
      //   redirectTo: ROUTES.analysisWithId + '/(' + OUTLETS.TAB_OUTLET + ':' + TAB_ROUTES.stakeholder + ')',
      //   pathMatch: 'prefix'
      // },
      {
        path: TAB_ROUTES.stakeholder,
        component: StakeholderEditComponent,
        outlet: OUTLETS.TAB_OUTLET
      },
      {
        path: TAB_ROUTES.value,
        component: ValueEditComponent,
        outlet: OUTLETS.TAB_OUTLET
      },
      {
        path: TAB_ROUTES.impact,
        component: ImpactEditComponent,
        outlet: OUTLETS.TAB_OUTLET
      },
      {
        path: TAB_ROUTES.variant,
        component: VariantEditComponent,
        outlet: OUTLETS.TAB_OUTLET
      },
      {
        path: TAB_ROUTES.requirement,
        component: RequirementEditComponent,
        outlet: OUTLETS.TAB_OUTLET
      },
      {
        path: TAB_ROUTES.dashboard,
        component: DashboardComponent,
        outlet: OUTLETS.TAB_OUTLET
      }
    ]
  },
  {
    path: ROUTES.imprint,
    component: ImprintComponent
  },
  {
    path: ROUTES.privacy,
    component: PrivacyComponent
  },
  {
    path: ROUTES.pageNotFound,
    component: PageNotFoundComponent
  },
  {
    path: ROUTES.settings,
    component: UserSettingsComponent
  },

  //{path: ROUTES.any, redirectTo: ROUTES.pageNotFound}, TODO reenable
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
