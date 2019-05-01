import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EventService} from '../../../shared/event.service';
import { Match } from 'src/app/shared/match';


@Component({
  selector: 'app-vue-match-of-club',
  templateUrl: './vue-match-of-club.component.html',
  styleUrls: ['./vue-match-of-club.component.css']
})
export class VueMatchOfClubComponent implements OnInit {
    matchs: Match[];
    constructor(
        private route: ActivatedRoute,
        public eventService: EventService
    ) { }

    ngOnInit() {
        this.loadMatchs();
    }

    loadMatchs() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.eventService.getAllMatchsFromClub(id).subscribe((data: {}) => {
            this.matchs = data as Match[];
        });
    }
}
