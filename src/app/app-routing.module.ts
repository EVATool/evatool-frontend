import { PrivacyComponent } from './application-shell/privacy/privacy.component';
import { ImprintComponent } from './application-shell/imprint/imprint.component';
import { ShellMainComponent } from './application-shell/shell-main/shell-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './application-shell/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'analysis', component: ShellMainComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
