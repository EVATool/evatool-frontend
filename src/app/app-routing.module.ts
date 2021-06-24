import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AnalysisEditComponent} from './components/analysis-edit/analysis-edit.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ROUTES} from './app-routes';

const routes: Routes = [
  {path: ROUTES.home, component: HomeComponent},
  {path: ROUTES.analysisWithId, component: AnalysisEditComponent},
  {path: ROUTES.imprint, component: ImprintComponent},
  {path: ROUTES.privacy, component: PrivacyComponent},
  {path: ROUTES.notFound, component: NotFoundComponent},
  {path: ROUTES.any, redirectTo: ROUTES.notFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
