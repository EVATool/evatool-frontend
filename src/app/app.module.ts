import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationShell } from './application-shell/application-shell.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StakeholderTableComponent } from './stakeholder/components/stakeholder-table/stakeholder-table.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        StakeholderTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ApplicationShell,
        BrowserAnimationsModule,
        MatIconModule
    ],
    providers: [],
    exports: [
        StakeholderTableComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
