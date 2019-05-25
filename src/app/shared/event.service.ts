import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from '../shared/match';
import { Event } from '../shared/event';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Equipe } from './equipe';


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
        new Equipe(item.equipe.id, item.equipe.nom),
      )))
    );
  }

  getAllMatchsFromEquipe(id): Observable<Match[]> {
    return this.http.get(this.apiURL + '/equipe/' + id + '/matchs')
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
        new Equipe(item.equipe.id, item.equipe.nom),
      )))
    );
  }

  getAllEventsFromClub(id): Observable<Event[]> {
    return this.http.get(this.apiURL + '/club/' + id + '/events')
    .pipe(
      map(
          (data: any[]) => data.map((item: any) => {
              const events: Event[] = [];
              const event = new Event(
                  item.id, item.title,
                  new Date(item.dateDebut), new Date(item.dateFin),
                  item.infosSup, {primary: '#1e90ff', secondary: '#D1E8FF'},
                  {beforeStart: false, afterEnd: false},
                  false);
              if (item.recurent) {
                    const rrule =  {
                        freq: item.freq,
                        byweekday: item.byweekday,
                        bymonth: item.bymonth,
                        bymonthday: item.bymonthday
                    };
                    event.rrule = rrule;
              }
              return event;
          }))
    );
  }

  getAllEventsFromEquipe(id): Observable<Event[]> {
    return this.http.get(this.apiURL + '/equipe/' + id + '/events')
    .pipe(
      map((data: any[]) => data.map((item: any) => new Event(
        item.id,
        item.title,
        new Date(item.dateDebut),
        new Date(item.dateFin),
        item.infosSup,
        {primary: '#1e90ff', secondary: '#D1E8FF'},
        {beforeStart: false, afterEnd: false},
        false
      )))
    );
  }

  createEvent(event): Observable<Event> {
    return this.http.post<Event>(this.apiURL + '/event', JSON.stringify(event), this.httpOptions)
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
