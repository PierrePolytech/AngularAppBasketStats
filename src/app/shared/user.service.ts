import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';
import { Token } from '../shared/token';
import { UserConnection } from '../shared/userconnection';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Define API
  apiURL = 'http://localhost:8080';
  userConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected());
    
  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    
  get isLoggedIn() {
    return this.userConnected.asObservable();
  }
    
  get isLoggedInValue() {
    return this.userConnected.value;
  }
    
  // HttpClient API post() method => Create salle
  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/utilisateur', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1)
    );
  }
    
  getUser(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/utilisateur')
    .pipe(
      retry(1)
    );
  }
    
  connectUser(userConnection): Observable<any> {
      return this.http.post<UserConnection>(this.apiURL + '/auth', JSON.stringify(userConnection), this.httpOptions)
    .pipe(
      retry(1),
      tap(
        data => {
            localStorage.setItem('id_token', data.token);
            localStorage.setItem('refresh_token', data.refreshToken);
            this.userConnected.next(true);
        }
      )
    );
  }
    
  refreshToken(token): Observable<Token> {
      return this.http.post<Token>(this.apiURL + '/auth/refresh', JSON.stringify(token), this.httpOptions)
    .pipe(
      retry(1)
    );
  }
    
  deconnectUser(){
      localStorage.clear();
      this.userConnected.next(false);
  }
    
  isConnected(){
      if(localStorage.getItem('refresh_token') && localStorage.getItem('id_token')){
        return true;
      } else {
        return false;    
      }
  }
}
