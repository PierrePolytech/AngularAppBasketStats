import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-vue-match-of-equipe',
  templateUrl: './vue-match-of-equipe.component.html',
  styleUrls: ['./vue-match-of-equipe.component.css']
})
export class VueMatchOfEquipeComponent implements OnInit {
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
        this.eventService.getAllMatchsFromEquipe(id).subscribe(data  => {
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
