import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRdvComponent } from './modules/rendez-vous/components/list-rdv/list-rdv.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'logout',
    component: LogoutComponent
  },
  { path: 'rdv', loadChildren: () => import('./modules/rendez-vous/rendez-vous.module').then(m => m.RendezVousModule), canActivate: [AuthGuard] },
  { path: 'administration', loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule) },
  {
    path:'**',
    redirectTo: 'rdv'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
