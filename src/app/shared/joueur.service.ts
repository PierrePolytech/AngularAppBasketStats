import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joueur } from '../shared/joueur';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class JoueurService {
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

  getJoueurs(): Observable<Joueur> {
    return this.http.get<Joueur>(this.apiURL + '/equipes')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllJoueursFromClub(id): Observable<Joueur> {
    return this.http.get<Joueur>(this.apiURL + '/club/' + id + '/joueurs')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllJoueursFromEquipe(id): Observable<Joueur> {
    return this.http.get<Joueur>(this.apiURL + '/equipe/' + id + '/joueurs')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getJoueur(id): Observable<Joueur> {
    return this.http.get<Joueur>(this.apiURL + '/joueur/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  searchJoueur(nom) {
    return this.http.get<Joueur>(this.apiURL + '/joueurs/results?search_query=' + nom, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createJoueur(joueur): Observable<Joueur> {
    return this.http.post<Joueur>(this.apiURL + '/joueur', JSON.stringify(joueur), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateJoueur(id, joueur): Observable<Joueur> {
    return this.http.put<Joueur>(this.apiURL + '/joueur/' + id, JSON.stringify(joueur), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteJoueur(id) {
    return this.http.delete<Joueur>(this.apiURL + '/joueur/' + id, this.httpOptions)
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
