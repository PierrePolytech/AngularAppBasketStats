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
  userConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
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
    
  // HttpClient API post() method => Create salle
  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/utilisateur', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
    
  connectUser(userConnection): Observable<UserConnection> {
      return this.http.post<UserConnection>(this.apiURL + '/auth', JSON.stringify(userConnection), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError),
      tap(
        data => this.userConnected.next(true)
      )
    );
  }
    
  refreshToken(token): Observable<Token> {
      return this.http.post<Token>(this.apiURL + '/auth/refresh', JSON.stringify(token), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
    
  deconnectUser(){
      localStorage.clear();
      this.userConnected.next(false);
  }
    
  isUserConnect(): boolean {
      const idToken = localStorage.getItem("id_token");
      return idToken ? true : false;
  }  

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     //window.alert(errorMessage);
     return throwError(error);
  }
}
