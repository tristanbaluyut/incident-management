import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@angular/fire/auth';

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
import { LoginService } from './services/login.service';
import { DatabaseService } from './services/database.service';
import { IncidentRemarksComponent } from './components/incident-remarks/incident-remarks.component';
import { StatusComponent } from './components/status/status.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
    IncidentsListComponent,
    IncidentRemarksComponent,
    StatusComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [LoginService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
