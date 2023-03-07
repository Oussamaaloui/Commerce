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
            //localStorage.setItem('currentUser', JSON.stringify(user));
            this.localStorageUser = user
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    this.localStorageUser = null;
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('login');
  }

  updateUserEmail(email: string){
    let user = this.localStorageUser;
    if(user){
      user.email = email;
      this.localStorageUser = user;
      this.currentUserSubject.next(this.localStorageUser);
    }
  }

  updateUsernames(firstname: string, lastname: string){
    let user = this.localStorageUser;

    if(user){
      user.firstName = firstname;
      user.lastName = lastname;
      this.localStorageUser = user;
      this.currentUserSubject.next(this.localStorageUser);
    } 
  }

  

  set localStorageUser(user: User | null){
    if(user){
      localStorage.setItem('currentUser', JSON.stringify(user));
    }else{
      localStorage.removeItem('currentUser');
    } 
  }

  get localStorageUser(): User | null{
    let userJson = localStorage.getItem('currentUser'); 

    if(userJson ){
      let user:User = JSON.parse(userJson)
      return user;
    }

    return null;
  }


}
