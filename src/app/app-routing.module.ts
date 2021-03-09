import { ShellMainComponent } from './application-shell/shell-main/shell-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './application-shell/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'main', component: ShellMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
