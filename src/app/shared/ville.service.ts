import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Ville } from './ville';

@Injectable({
  providedIn: 'root'
})

export class VilleService {
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

  getVille(id): Observable<Ville> {
    return this.http.get<Ville>(this.apiURL + '/ville/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createVille(ville): Observable<Ville> {
    return this.http.post<Ville>(this.apiURL + '/ville', JSON.stringify(ville), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateVille(id, ville): Observable<Ville> {
    return this.http.put<Ville>(this.apiURL + '/ville/' + id, JSON.stringify(ville), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteVille(id) {
    return this.http.delete<Ville>(this.apiURL + '/ville/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
