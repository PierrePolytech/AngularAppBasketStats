import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from './match';
import { Event } from './event';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Equipe } from './equipe';
import { CalendarEvent } from 'angular-calendar';
import { RRule, RRuleSet, rrulestr } from 'rrule';

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

  getAllEventsFromClub(id): Observable<CalendarEvent[]> {
    return this.http.get(this.apiURL + '/club/' + id + '/events')
    .pipe(
      map(( data: any[]) => 
        data.reduce((result, item) => {
          if (item.recurent) {
            Array.prototype.push.apply(result,this.createEventRecurent(item));
          } else {
            const eventDb = new Event(
            item.id, item.title,
            new Date(item.dateDebut), new Date(item.dateFin),
            item.infosSup, item.typeEvent);
            eventDb.clubs= item.clubs;
            eventDb.equipes= item.equipes;
            result.push({
                  start: new Date(item.dateDebut),
                  end: new Date(item.dateFin),
                  title: item.title,
                  color: this.getColor(item.typeEvent),
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: true,
                  meta: {
                    eventDb
                  }
            });
          }
          return result;
      }, []))
    );
  }

  getAllEventsFromEquipe(id): Observable<Event[]> {
    return this.http.get(this.apiURL + '/equipe/' + id + '/events')
    .pipe(
      map(
          (data: any[]) => data.map((item: any) => {
              const events: Event[] = [];
              const event = new Event(
                  item.id, item.title,
                  new Date(item.dateDebut), new Date(item.dateFin),
                  item.infosSup, item.typeEvent);
              if (item.recurent) {
                  event.recurent = item.recurent;
                  event.freq= item.freq;
                  event.byweekday= item.byweekday;
                  event.bymonth= item.bymonth;
                  event.bymonthday= item.bymonthday;
              }
              return event;
          }))
    );
  }

  createEvent(event): Observable<Event> {
    return this.http.post<Event>(this.apiURL + '/event', JSON.stringify(event), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
    
  updateEvent(event): Observable<Event> {
    return this.http.put<Event>(this.apiURL + '/event', JSON.stringify(event), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
    
    createEventRecurent(event: any) {
        const events = [];
        const options = RRule.parseString('FREQ='+ event.freq+';BYWEEKDAY='+ event.byweekday);
        options.dtstart = new Date(event.dateDebut);
        options.until = new Date(event.dateFin);
        const rruleSet = new RRule (options);
        rruleSet.all().forEach(date => {
            const datefin = new Date(date);
            datefin.setHours(options.until.getHours(), options.until.getMinutes(), 0);
            const eventDb = new Event(event.id, event.title,event.dateDebut, event.dateFin, event.infosSup, event.typeEvent);
            eventDb.recurent = event.recurent;
            eventDb.freq= event.freq;
            eventDb.byweekday= event.byweekday;
            eventDb.bymonth= event.bymonth;
            eventDb.bymonthday= event.bymonthday;
            eventDb.clubs= event.clubs;
            eventDb.equipes= event.equipes;
            events.push(
                {
                  start: new Date(date),
                  end: datefin,
                  title: event.title,
                  color: this.getColor(event.typeEvent),
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: false,
                  meta: {
                    eventDb
                  }
                }
            );
        });
        return events;
    }
    
    getColor(typeEvent: string) {
        let color = {primary: '#ad2121', secondary: '#FAE3E3'};
        if(typeEvent == 'MATCH'){
            color = {primary: '#ad2121', secondary: '#FAE3E3'};
        } else if(typeEvent == 'ENTRAINEMENT'){
            color = {primary: '#1e90ff',secondary: '#D1E8FF'};
        } else if(typeEvent == 'AUTRE'){
            color = {primary: '#e3bc08',secondary: '#FDF1BA'};
        }   
        return color;
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
