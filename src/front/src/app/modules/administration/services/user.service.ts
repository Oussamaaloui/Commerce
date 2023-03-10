import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Globals } from 'src/app/helpers/globals';
import { User } from '../models/user.model';
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.apiUrl}/api/users`);
  }

  toggleUserActivity(id: string, isActive: boolean){
    if(isActive){
      return this.httpClient.post<any>(`${environment.apiUrl}/api/users/activate/${id}`, null);
    }else{
      return this.httpClient.post<any>(`${environment.apiUrl}/api/users/deactivate/${id}`, null);
    }
  }

  toggleUserAdmin(id: string, isActive: boolean){
    if(isActive){
      return this.httpClient.post<any>(`${environment.apiUrl}/api/users/set-admin/${id}`, null);
    }else{
      return this.httpClient.post<any>(`${environment.apiUrl}/api/users/remove-admin/${id}`, null);
    }
  }

  deleteUser(id: string){
    return this.httpClient.delete<any>(`${environment.apiUrl}/api/users/${id}`);
  }
}
