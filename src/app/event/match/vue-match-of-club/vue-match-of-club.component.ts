import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EventService} from '../../../shared/event.service';
import { groupBy, toArray, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';


@Component({
  selector: 'app-vue-match-of-club',
  templateUrl: './vue-match-of-club.component.html',
  styleUrls: ['./vue-match-of-club.component.css']
})
export class VueMatchOfClubComponent implements OnInit {
    matchsByMonth: any[];
    constructor(
        private route: ActivatedRoute,
        public eventService: EventService
    ) {
        this.matchsByMonth = [];
    }

    ngOnInit() {
        this.loadMatchs();
    }

    loadMatchs() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.eventService.getAllMatchsFromClub(id).subscribe(data  => {
            const json = from(data);
            const matchs = json.pipe(
                groupBy(match => match.dateMatch.getMonth()),
                mergeMap(group => group.pipe(toArray()))
            );
            matchs.subscribe(val => {
                this.matchsByMonth.push(val);
            });
        });
    }
}
