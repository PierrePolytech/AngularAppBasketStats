import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Club } from '../shared/club';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClubService {

  // Define API
  apiURL = 'http://localhost:8080';

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

  // HttpClient API get() method => Fetch clubs list
  getClubs(): Observable<Club> {
    return this.http.get<Club>(this.apiURL + '/clubs')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API get() method => Fetch club
  getClub(id): Observable<Club> {
    return this.http.get<Club>(this.apiURL + '/club/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  searchClub(nom) {
    return this.http.get<Club>(this.apiURL + '/clubs/results?search_query=' + nom, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API post() method => Create club
  createClub(club): Observable<Club> {
    return this.http.post<Club>(this.apiURL + '/club', JSON.stringify(club), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API put() method => Update club
  updateClub(id, club): Observable<Club> {
    return this.http.put<Club>(this.apiURL + '/club/' + id, JSON.stringify(club), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API delete() method => Delete club
  deleteClub(id) {
    return this.http.delete<Club>(this.apiURL + '/club/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
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
