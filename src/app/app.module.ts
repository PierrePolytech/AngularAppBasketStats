import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgAisModule } from 'angular-instantsearch';


// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

// Forms module
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Components

// Club
import { VueInterneClubComponent } from './club/vue-interne-club/vue-interne-club.component';
import { VueSearchClubComponent } from './club/vue-search-club/vue-search-club.component';
import { VueExterneClubComponent } from './club/vue-externe-club/vue-externe-club.component';
import { VueEditClubComponent } from './club/vue-edit-club/vue-edit-club.component';
import { VueCreateClubComponent } from './club/vue-create-club/vue-create-club.component';

// Equipe
import { VueCreateEquipeComponent } from './equipe/vue-create-equipe/vue-create-equipe.component';
import { VueEditEquipeComponent } from './equipe/vue-edit-equipe/vue-edit-equipe.component';
import { VueExterneEquipeComponent } from './equipe/vue-externe-equipe/vue-externe-equipe.component';
import { VueInterneEquipeComponent } from './equipe/vue-interne-equipe/vue-interne-equipe.component';
import { VueSearchEquipeComponent } from './equipe/vue-search-equipe/vue-search-equipe.component';

import { VueEquipeOfClubComponent } from './equipe/vue-equipe-of-club/vue-equipe-of-club.component';

// Joueur
import { VueJoueurOfClubComponent } from './joueur/vue-joueur-of-club/vue-joueur-of-club.component';
import { VueCreateJoueurComponent } from './joueur/vue-create-joueur/vue-create-joueur.component';
import { VueEditJoueurComponent } from './joueur/vue-edit-joueur/vue-edit-joueur.component';

// Autres
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { VueJoueurOfEquipeComponent } from './joueur/vue-joueur-of-equipe/vue-joueur-of-equipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { VueMatchOfClubComponent } from './event/match/vue-match-of-club/vue-match-of-club.component';
import { VueMatchOfEquipeComponent } from './event/match/vue-match-of-equipe/vue-match-of-equipe.component';
import { VueEventOfClubComponent } from './event/vue-event-of-club/vue-event-of-club.component';
import { VueEventOfEquipeComponent } from './event/vue-event-of-equipe/vue-event-of-equipe.component';


const googleMapsParams = {
  apiKey: 'AIzaSyDVafjOTJVq5jbqQiSxyMitBhrf2P3Mhtg',
  libraries: ['places'],
  language: 'en',
  // region: 'DE'
};


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    VueInterneClubComponent,
    VueSearchClubComponent,
    VueExterneClubComponent,
    VueEditClubComponent,
    VueCreateClubComponent,
    VueCreateEquipeComponent,
    VueEditEquipeComponent,
    VueExterneEquipeComponent,
    VueInterneEquipeComponent,
    VueSearchEquipeComponent,
    VueEquipeOfClubComponent,
    VueJoueurOfClubComponent,
    VueCreateJoueurComponent,
    VueEditJoueurComponent,
    VueJoueurOfEquipeComponent,
    VueMatchOfClubComponent,
    VueMatchOfEquipeComponent,
    VueEventOfClubComponent,
    VueEventOfEquipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule.forRoot(),
    AgmCoreModule.forRoot(googleMapsParams),
    NgAisModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
