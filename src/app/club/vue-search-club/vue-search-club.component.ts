import { Component, OnInit, ViewChild } from '@angular/core';
import {ClubService} from '../../shared/club.service';
import { Page } from 'src/app/shared/page';
import { Club } from 'src/app/shared/club';
import {MatPaginatorIntl} from '@angular/material';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';

@Component({
  selector: 'app-vue-search-club',
  templateUrl: './vue-search-club.component.html',
  styleUrls: ['./vue-search-club.component.css'],
  providers: [
      {provide: MatPaginatorIntl, useClass: FrenchMatPaginatorIntl}
  ]
})
export class VueSearchClubComponent implements OnInit {
    length = 100;
    pageSize = 12;
    pageSizeOptions: number[] = [9, 12, 24];
    @ViewChild('paginatorTop') paginatorTop;
    @ViewChild('paginatorBottom') paginatorBottom;
    @ViewChild('search-input') searchClub;
    
    clubs: Club[]= [];
    constructor(
        public clubService: ClubService
    ) { }

    ngOnInit() {
        this.loadClubs('', 0, this.pageSize);
    }

    searchClubs(nom) {
        this.loadClubs(nom, 0, this.pageSize) 
    }
    
    loadClubs(nom, page, size) {
        return this.clubService.searchClub(nom, page, size).subscribe((data: Page) => {
            this.clubs = data.content;
            this.length= data.totalElements;
        });
    }

    onChangePageBottom(event){
        this.paginatorTop.pageIndex = event.pageIndex;
        this.loadClubs(this.searchClub.value, event.pageIndex, event.pageSize);
    }
    
    onChangePageTop(event){
        this.paginatorBottom.pageIndex = event.pageIndex;
        this.loadClubs(this.searchClub.value, event.pageIndex, event.pageSize);
    }
}
