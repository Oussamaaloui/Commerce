import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Globals } from '../helpers/globals';
import { ChangePasswordModel } from '../models/change-password.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: RegisterModel){
    return this.http.post<any>(`${Globals.BASE_URL}/api/Authenticate/register`, user)
  }

  changePassword(input: ChangePasswordModel){
    return this.http.post<any>(`${Globals.BASE_URL}/api/Authenticate/change-password`, input)
  }
}
