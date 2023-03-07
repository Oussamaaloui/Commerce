import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import frMessages  from "devextreme/localization/messages/fr.json";
import { locale, loadMessages } from "devextreme/localization";



@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class AppComponent {
  title = 'commerce';

  constructor(){
    registerLocaleData(localeFr);
    loadMessages(frMessages);
        locale('fr');
  }
}
