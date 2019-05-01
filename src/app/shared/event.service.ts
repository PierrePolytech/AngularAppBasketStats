import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from '../shared/match';
import { Event } from '../shared/event';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
// Define API
  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllMatchsFromClub(id): Observable<Match[]> {
    return this.http.get(this.apiURL + '/club/' + id + '/matchs')
    .pipe(
      map((data: any[]) => data.map((item: any) => new Match(
        item.id,
        new Date(item.dateMatch),
        item.domicile,
        item.heureMatch,
        item.heureRDV,
        item.adversaire,
        item.scoreEquipe,
        item.scoreAdversaire,
        item.infosSup,
      )))
    );
  }

  getAllEventsFromClub(id): Observable<Event> {
    return this.http.get<Event>(this.apiURL + '/club/' + id + '/events')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllMatchsFromEquipe(id): Observable<Match> {
    return this.http.get<Match>(this.apiURL + '/equipe/' + id + '/matchs')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllEventsFromEquipe(id): Observable<Event> {
    return this.http.get<Event>(this.apiURL + '/equipe/' + id + '/events')
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
