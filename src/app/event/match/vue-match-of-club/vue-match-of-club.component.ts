import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EventService} from '../../../shared/event.service';
import { groupBy, toArray, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Match } from 'src/app/shared/match';
import { Club } from 'src/app/shared/club';
import * as moment from 'moment';


@Component({
  selector: 'app-vue-match-of-club',
  templateUrl: './vue-match-of-club.component.html',
  styleUrls: ['./vue-match-of-club.component.css']
})
export class VueMatchOfClubComponent implements OnInit {
    matchsByMonthJoue: any[];
    matchsByMonthAVenir: any[];
    @Input() club: Club;
    
    constructor(
        private route: ActivatedRoute,
        public eventService: EventService
    ) {
        this.matchsByMonthJoue = [];
        this.matchsByMonthAVenir = [];
    }

    ngOnInit() {
        this.loadMatchs();
    }

    loadMatchs() {
        this.eventService.getAllMatchsFromClub(this.club.id).subscribe(data  => {
            const json = from(data);
            const matchs = json.pipe(
                groupBy(match => match.dateMatch.getMonth()),
                mergeMap(group => group.pipe(toArray()))
            );
            matchs.subscribe((matchsParMois: Match[]) => {
                const matchsPasJoue = matchsParMois.filter(match => moment(match.dateMatch, 'YYYY-MM-DD').isAfter(moment()));
                this.matchsByMonthAVenir.push(matchsPasJoue);

                const matchsJoue = matchsParMois.filter(match => moment(match.dateMatch, 'YYYY-MM-DD').isBefore(moment()));
                this.matchsByMonthJoue.push(matchsJoue);
            });
        });
    }
}
