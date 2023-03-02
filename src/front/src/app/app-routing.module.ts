import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRdvComponent } from './components/edit-rdv/edit-rdv.component';
import { ListRdvComponent } from './components/list-rdv/list-rdv.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
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
  {
    path:'rdv',
    component: ListRdvComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'rdv/create',
    component: EditRdvComponent
  },
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
