import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncidentDetailsComponent } from './pages/incident-details/incident-details.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RaiseIncidentComponent } from './pages/raise-incident/raise-incident.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'incidents', component: IncidentsComponent, canActivate: [AuthGuard] },
  { path: 'incident-details/:key', component: IncidentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'raise-incident', component: RaiseIncidentComponent, canActivate: [AuthGuard] }, 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
