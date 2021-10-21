import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';
import { LoginComponent } from './pages/login/login.component';
import { RaiseIncidentComponent } from './pages/raise-incident/raise-incident.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'incidents', component: IncidentsComponent },
  { path: 'incident-details', component: IncidentsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'raise-incident', component: RaiseIncidentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
