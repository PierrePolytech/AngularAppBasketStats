import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-vue-profil-utilisateur',
  templateUrl: './vue-profil-utilisateur.component.html',
  styleUrls: ['./vue-profil-utilisateur.component.css']
})
export class VueProfilUtilisateurComponent implements OnInit {
  user: User;

  constructor(
    public userService: UserService
  ) {}

  ngOnInit() {
      this.loadUser();
  }
    
  loadUser(){
    this.userService.getUser().subscribe(user=> this.user = user);   
  }

}
