import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  
  selectedOpenMode: boolean = true;
  isDrawerOpen: boolean = true;
  
  

  toggleDrawer(){
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
