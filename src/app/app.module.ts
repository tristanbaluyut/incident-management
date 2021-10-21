import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './sections/navbar/navbar.component';
import { SidebarComponent } from './sections/sidebar/sidebar.component';
import { RaiseIncidentComponent } from './pages/raise-incident/raise-incident.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';
import { IncidentDetailsComponent } from './pages/incident-details/incident-details.component';
import { IncidentsListComponent } from './components/incidents-list/incidents-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    RaiseIncidentComponent,
    IncidentsComponent,
    IncidentDetailsComponent,
    IncidentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
