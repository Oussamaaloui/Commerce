import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'admin-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit {
  defaultVisible = false;
  changePasswordDialogVisible = false; 
  triggerOpen: Subject<void> = new Subject<void>();
  
  constructor(public authService: AuthenticationService){}


  ngOnInit(): void {
    this.userName = `${this.authService.currentUserValue?.firstName}, ${this.authService.currentUserValue?.lastName}`;
  }

  userName: string = '';

  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }

  showChangePasswordDialog(){
    this.triggerOpen.next()
    this.changePasswordDialogVisible = true;
  }

  closeChangePasswordDialog(){
    this.changePasswordDialogVisible = false;
  }
}
