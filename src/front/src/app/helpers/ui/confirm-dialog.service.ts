import { Injectable } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor() { }

  askUser(message: string): Promise<boolean>{
    return confirm(`
      ${message}
    `, "Confirm changes");
  }
}
