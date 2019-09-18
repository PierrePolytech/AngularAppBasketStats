import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipe } from '../shared/equipe';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EquipeService {

  // Define API
  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEquipes(): Observable<Equipe> {
    return this.http.get<Equipe>(this.apiURL + '/equipes')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
    
  getMesEquipes(): Observable<Equipe> {
    return this.http.get<Equipe>(this.apiURL + '/mesequipes')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getEquipe(id): Observable<Equipe> {
    return this.http.get<Equipe>(this.apiURL + '/equipe/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllEquipesFromClub(id): Observable<Equipe> {
    return this.http.get<Equipe>(this.apiURL + '/club/' + id + '/equipes')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  searchEquipe(nom) {
    return this.http.get<Equipe>(this.apiURL + '/equipes/results?search_query=' + nom, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createEquipe(equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.apiURL + '/equipe', JSON.stringify(equipe), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createEquipeFromClub(equipe, id): Observable<Equipe> {
    return this.http.post<Equipe>(this.apiURL + '/club/' + id + '/equipe', equipe, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  updateEquipe(id, equipe): Observable<Equipe> {
    return this.http.put<Equipe>(this.apiURL + '/equipe/' + id, JSON.stringify(equipe), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteEquipe(id) {
    return this.http.delete<Equipe>(this.apiURL + '/equipe/' + id, this.httpOptions)
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
