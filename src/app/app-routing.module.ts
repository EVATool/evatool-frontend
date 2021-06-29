import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AnalysisEditComponent} from './components/analysis-edit/analysis-edit.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ROUTES} from './app-routes';
import {LoginComponent} from './components/login/login.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {TitlePageComponent} from './components/title-page/title-page.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {TimeOutComponent} from './components/time-out/time-out.component';

const routes: Routes = [
  {path: ROUTES.home, component: HomeComponent},
  {path: ROUTES.title, component: TitlePageComponent},
  {path: ROUTES.login, component: LoginComponent},
  {path: ROUTES.forgotPassword, component: ForgotPasswordComponent},
  {path: ROUTES.termsAndConditions, component: TermsAndConditionsComponent},
  {path: ROUTES.timeOut, component: TimeOutComponent},
  {path: ROUTES.accessDenied, component: AccessDeniedComponent},
  {path: ROUTES.analysisWithId, component: AnalysisEditComponent},
  {path: ROUTES.imprint, component: ImprintComponent},
  {path: ROUTES.privacy, component: PrivacyComponent},
  {path: ROUTES.pageNotFound, component: PageNotFoundComponent},
  {path: ROUTES.any, redirectTo: ROUTES.pageNotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
