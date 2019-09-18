import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Club } from '../shared/club';
import { Page } from '../shared/page';
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
      retry(1)
    );
  }

  // HttpClient API get() method => Fetch club
  getClub(id): Observable<Club> {
    return this.http.get<Club>(this.apiURL + '/club/' + id)
    .pipe(
      retry(1)
    );
  }
    
  // HttpClient API get() method => Fetch club
  getClubByURL(url): Observable<Club> {
    return this.http.get<Club>(this.apiURL + '/club/' + url)
    .pipe(
      retry(1)
    );
  }

  searchClub(nom, page, size) {
    return this.http.get<Page>(this.apiURL + '/clubs/results?search_query=' + nom + '&page=' + page + '&size=' + size , this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  // HttpClient API post() method => Create club
  createClub(club): Observable<Club> {
    return this.http.post<Club>(this.apiURL + '/club', JSON.stringify(club), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  // HttpClient API put() method => Update club
  updateClub(id, club): Observable<Club> {
    return this.http.put<Club>(this.apiURL + '/club/' + id, JSON.stringify(club), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  // HttpClient API delete() method => Delete club
  deleteClub(id) {
    return this.http.delete<Club>(this.apiURL + '/club/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  existUrlClub(url) {
    return this.http.get<boolean>(this.apiURL + '/club/exist?url=' + url, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
}
