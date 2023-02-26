import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Globals } from '../helpers/globals';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User| null>;
    
  constructor(private http: HttpClient, private router: Router) { 
        let userJson = localStorage.getItem('currentUser') ?? '';

        if(userJson){
          this.currentUserSubject = new BehaviorSubject<User |null>(JSON.parse(userJson));
          this.currentUser = this.currentUserSubject.asObservable();
        }else{
          this.currentUserSubject = new BehaviorSubject<User |null>(null);
          this.currentUser = this.currentUserSubject.asObservable();
        }

        
  }

  public get currentUserValue(): User| null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${Globals.BASE_URL}/api/Authenticate/login`, { email, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('login');
  }
}
