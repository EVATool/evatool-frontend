import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AnalysisEditComponent} from './components/analysis-edit/analysis-edit.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ROUTES} from './app-routes';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: ROUTES.home, component: HomeComponent},
  {path: ROUTES.login, component: LoginComponent},
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
