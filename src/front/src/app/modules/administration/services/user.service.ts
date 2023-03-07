import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/helpers/globals';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${Globals.BASE_URL}/api/users`);
  }

  toggleUserActivity(id: string, isActive: boolean){
    if(isActive){
      return this.httpClient.post<any>(`${Globals.BASE_URL}/api/users/activate/${id}`, null);
    }else{
      return this.httpClient.post<any>(`${Globals.BASE_URL}/api/users/deactivate/${id}`, null);
    }
  }

  deleteUser(id: string){
    return this.httpClient.delete<any>(`${Globals.BASE_URL}/api/users/${id}`);
  }
}
