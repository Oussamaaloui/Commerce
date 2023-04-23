import { Component } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isDrawerOpen: boolean = true;
  // Password handling
  changePasswordDialogVisible = false;
  triggerOpen: Subject<void> = new Subject<void>();
  // change info handling
  changeInfoDialogVisible = false;
  triggerChangeInfoOpen: Subject<void> = new Subject<void>();
  // change Email handling
  changeEmailDialogVisible = false;
  triggerChangeEmailOpen: Subject<void> = new Subject<void>();

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }


  showChangePasswordDialog() {
    this.triggerOpen.next()
    this.changePasswordDialogVisible = true;
  }

  closeChangePasswordDialog() {
    this.changePasswordDialogVisible = false;
  }

  showChangeInfoDialog() {
    this.triggerChangeInfoOpen.next()
    this.changeInfoDialogVisible = true;
  }

  closeChangeInfoDialog() {
    this.changeInfoDialogVisible = false;
  }

  showChangeEmailDialog() {
    this.triggerChangeEmailOpen.next()
    this.changeEmailDialogVisible = true;
  }

  closeChangeEmailDialog() {
    this.changeEmailDialogVisible = false;
  }
}
