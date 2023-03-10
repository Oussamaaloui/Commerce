import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import {ConfirmDialogService} from "../../../../helpers/ui/confirm-dialog.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users:User[];
  isSettingActive: boolean = false;

  constructor(private userService: UserService,
    public authService : AuthenticationService,
    private confirmationService : ConfirmDialogService,
    private notificationService: ToasterService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAll()
    .subscribe({
      next: (d) =>{
        this.users = d;
      }
    })
  }

  workingOnActiveColumn: any = {}

  getColumnActiveLoadingVisibility(id: string){
    if(this.workingOnActiveColumn[id]){
      return true;
    }
    return false;
  }

  workingOnAdminColumn: any = {}

  getColumnAdminLoadingVisibility(id: string){
    if(this.workingOnAdminColumn[id]){
      return true;
    }
    return false;
  }


  deleteUser(id: string){
    let user = this.users.filter(u => u.id === id)[0]
    if(user){
      this.confirmationService.askUser(`Etes vous sûre de vouloir supprimer '${user.firstName}, ${user.lastName}'`)
        .then(response =>{
          if(response){
              this.userService.deleteUser(id)
                .subscribe({
                  next: () =>{
                    this.loadUsers();
                  },
                  error: (error: HttpErrorResponse)=>{
                    this.notificationService.showError(error.error.message);
                  }
                })
          }
        });
    }
  }

  changeIsActive(id: string, value: boolean, event:any){
    console.log('valueChanged')
    this.isSettingActive = true;
    this.workingOnActiveColumn[id] = true;

    if(value) {

      // user confirmed the action
      this.userService.toggleUserActivity(id, true)
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Utilisateur activé avec succès');
            this.workingOnActiveColumn[id] = false;
          },
          error: () => {
            this.notificationService.showError("Problème survenu lors de l'activation de lutilisateur");
            event.value = false;
            this.workingOnActiveColumn[id] = false;
          }
        })
    }else{
      this.userService.toggleUserActivity(id, false)
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Utilisateur désactivé avec succès');
            this.workingOnActiveColumn[id] = false;
          },
          error: () => {
            this.notificationService.showError("Problème survenu lors de la désactivation de lutilisateur");
            this.workingOnActiveColumn[id] = false;
          }
        })
    }
  }

  changeIsAdmin(id: string, value: boolean, event:any){
    this.isSettingActive = true;
    this.workingOnAdminColumn[id] = true;

    if(value) {

      // user confirmed the action
      this.userService.toggleUserAdmin(id, true)
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('L\'utilisateur est un administrateur');
            this.workingOnAdminColumn[id] = false;
          },
          error: (err) => {
            this.notificationService.showError("Problème survenu lors de la mise à jour: "+err.error.message);
            event.value = false;
            this.workingOnAdminColumn[id] = false;
          }
        })
    }else{
      this.userService.toggleUserAdmin(id, false)
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('L\'utilisateur n\'est plus un administateur');
            this.workingOnAdminColumn[id] = false;
          },
          error: (err) => {
            this.notificationService.showError("Problème survenu lors de la mise à jour: "+err.error.message);
            this.workingOnAdminColumn[id] = false;
            event.value = true;
          }
        })
    }
  }

  getSetPropertiesDisabled(id: string){
    if(this.authService.currentUserValue){
      return this.authService.currentUserValue.id === id
    }
    return true;
  }

}
