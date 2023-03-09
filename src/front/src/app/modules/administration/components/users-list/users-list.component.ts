import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import {ConfirmDialogService} from "../../../../helpers/ui/confirm-dialog.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users:User[];
  isSettingActive: boolean = false;

  constructor(private userService: UserService,
    private confirmationService : ConfirmDialogService,
    private notificationService: ToasterService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAll()
    .subscribe({
      next: (d) =>{
        console.log(d)
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
}
