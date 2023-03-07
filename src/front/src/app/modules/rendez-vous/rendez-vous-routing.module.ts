import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListRdvComponent} from "./components/list-rdv/list-rdv.component";
import {AuthGuard} from "../../helpers/auth.guard";

const routes: Routes = [
  {
    path:'',
    component: ListRdvComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendezVousRoutingModule { }
