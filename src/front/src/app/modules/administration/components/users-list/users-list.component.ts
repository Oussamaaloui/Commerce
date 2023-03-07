import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
 
  users:User[];
  isSettingActive: boolean = false;

  constructor(private userService: UserService,
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

  changeIsActive(id: string, value: boolean, event:any){ 
    this.isSettingActive = true;
    this.workingOnActiveColumn[id] = true;
    console.log(event);
    if(value){
      this.userService.toggleUserActivity(id, true)
      .subscribe({
        next: () =>{
            this.notificationService.showSuccess('Utilisateur activé avec succès');
            this.workingOnActiveColumn[id] = false;
        },
        error: () => {
          this.notificationService.showError("Problème survenu lors de l'activation de lutilisateur");
          this.users.filter(u => u.id === id)[0].isActive = false;
          this.workingOnActiveColumn[id] = false;
        }
      })
    }else{
      this.userService.toggleUserActivity(id, false)
      .subscribe({
        next: () =>{
            this.notificationService.showSuccess('Utilisateur désactivé avec succès');
            this.workingOnActiveColumn[id] = false;
        },
        error: () => {
          this.notificationService.showError("Problème survenu lors de la désactivation de lutilisateur");
          this.users.filter(u => u.id === id)[0].isActive = false;
          this.workingOnActiveColumn[id] = false;
        }
      })
    } 
  }
}
