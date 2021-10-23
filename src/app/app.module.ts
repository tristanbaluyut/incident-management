import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@angular/fire/auth';
import { ChartsModule } from 'ng2-charts';


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
import { UserComponent } from './components/user/user.component';
import { IncidentsBarComponent } from './components/charts/incidents-bar/incidents-bar.component';
import { IncidentsPieComponent } from './components/charts/incidents-pie/incidents-pie.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AlertSectionComponent } from './sections/alert-section/alert-section.component';
import { AlertService } from './services/alert.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './pages/users/users.component';

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
    ProfileComponent,
    UserComponent,
    IncidentsBarComponent,
    IncidentsPieComponent,
    ForgotPasswordComponent,
    AlertSectionComponent,
    UserListComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    ChartsModule 
  ],
  providers: [LoginService, DatabaseService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
