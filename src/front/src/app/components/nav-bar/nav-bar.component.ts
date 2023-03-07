import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  tootltipVisibility = false;
  tootltipChangePassVisibility = false;
  
  
  
  @Output("toggleDrawer") toggelDrawer: EventEmitter<void> = new EventEmitter<void>();

  constructor(public authService: AuthenticationService){}

  triggerDrawerToggling(){
    this.toggelDrawer.emit();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: (user) =>{
        if(user)
          this.userName = `${user.firstName}, ${user.lastName}`;
        else
          this.userName = '';
      }
    })

    
  }

  userName: string = '';

  toggleDefault() {
    this.tootltipVisibility = !this.tootltipVisibility;
  }

  toggleTootltipChangePassVisibility() {
    this.tootltipChangePassVisibility = !this.tootltipChangePassVisibility;
  }
}
