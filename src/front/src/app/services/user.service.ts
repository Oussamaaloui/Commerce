import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangeEmailModel, ChangeInfoModel, ChangePasswordModel } from '../models/change-password.model';
import { RegisterModel } from '../models/register.model';
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: RegisterModel){
    console.log('register from service: sending request')
    return this.http.post<any>(`${environment.apiUrl}/api/Authenticate/register`, user)
  }

  changePassword(input: ChangePasswordModel){
    console.log('changePassword from service: sending request')
    return this.http.post<any>(`${environment.apiUrl}/api/Authenticate/change-password`, input)
  }

  changeEmail(input: ChangeEmailModel){
    console.log('changeEmail from service: sending request')
    return this.http.post<any>(`${environment.apiUrl}/api/profile/email`, input)
  }

  changeInfo(input: ChangeInfoModel){
    return this.http.post<any>(`${environment.apiUrl}/api/profile/info`, input)
  }


}
