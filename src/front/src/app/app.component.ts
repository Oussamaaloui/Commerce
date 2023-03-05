import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import frMessages  from "devextreme/localization/messages/fr.json";
import { locale, loadMessages } from "devextreme/localization";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'commerce';

  constructor(){
    registerLocaleData(localeFr);
    loadMessages(frMessages);
        locale('fr');
  }
}
