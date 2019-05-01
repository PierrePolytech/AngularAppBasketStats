import { Component, OnInit } from '@angular/core';
import {ClubService} from '../../shared/club.service';

@Component({
  selector: 'app-vue-search-club',
  templateUrl: './vue-search-club.component.html',
  styleUrls: ['./vue-search-club.component.css']
})
export class VueSearchClubComponent implements OnInit {

    Club: any = [];
    constructor(
        public clubService: ClubService
    ) { }

    ngOnInit() {
        this.loadClubs('');
    }

    loadClubs(nom) {
        return this.clubService.searchClub(nom).subscribe((data: {}) => {
            this.Club = data;
        });
    }

    deleteClub(id) {
        if (window.confirm('Are you sure, you want to delete ?')) {
            this.clubService.deleteClub(id).subscribe(data => {
                this.loadClubs('');
            });
        }
    }

}
