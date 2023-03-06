import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }


  showError(message: string){
    this.show(message, 'error')
  }

  showSuccess(message: string){
    this.show(message, 'success')
  }

  show(message: string, type:'error'|'info' | 'success'| 'warning'){
    notify({
      message: message,
      height: 45,
      width: 350,
      minWidth: 150,
      type: type,
      displayTime: 2500,
      animation: {
        show: {
          type: 'fade', duration: 400, from: 0, to: 1,
        },
        hide: { type: 'fade', duration: 40, to: 0 },
      },
    },
    { 
      position: 'top right', 
      direction : 'down-push'
    });
  }
}
