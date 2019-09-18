import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
import { VueMatchOfClubComponent } from './event/match/vue-match-of-club/vue-match-of-club.component';
import { VueMatchOfEquipeComponent } from './event/match/vue-match-of-equipe/vue-match-of-equipe.component';
import { VueEventOfClubComponent } from './event/vue-event-of-club/vue-event-of-club.component';
import { VueEventOfEquipeComponent } from './event/vue-event-of-equipe/vue-event-of-equipe.component';

// Calendar
import { CalendarHeaderComponent } from './calendar/calendar-header.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { VueCreateEventOfClubComponent } from './event/vue-create-event-of-club/vue-create-event-of-club.component';
import { VueCreateEventOfEquipeComponent } from './event/vue-create-event-of-equipe/vue-create-event-of-equipe.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

// Algolia
import { NgAisModule } from 'angular-instantsearch';
import { AutocompletecityComponent } from './component/autocompletecity/autocompletecity.component';
import { ModalModificationEventComponent } from './modal/modal-modification-event/modal-modification-event.component';
import { ModalEditEventClubComponent } from './modal/modal-edit-event-club/modal-edit-event-club.component';
import { ModalEditEventEquipeComponent } from './modal/modal-edit-event-equipe/modal-edit-event-equipe.component';
import { VueParametreClubComponent } from './club/vue-parametre-club/vue-parametre-club.component';
import { VueAjoutSalleClubComponent } from './salle/vue-ajout-salle-club/vue-ajout-salle-club.component';
import { AutocompleteAdresseComponent } from './component/autocomplete-adresse/autocomplete-adresse.component';

import { VueInscriptionUtilisateurComponent } from './utilisateur/vue-inscription-utilisateur/vue-inscription-utilisateur.component';
import { ModalLoginComponent } from './modal/modal-login/modal-login.component';

import { AuthInterceptor } from './shared/authInterceptor';
import { AuthErrorHandler } from './shared/authErrorHandler';
import { VueEventOfJoueurComponent } from './event/vue-event-of-joueur/vue-event-of-joueur.component';
import { VueEquipeOfJoueurComponent } from './equipe/vue-equipe-of-joueur/vue-equipe-of-joueur.component';
import { VueProfilUtilisateurComponent } from './utilisateur/vue-profil-utilisateur/vue-profil-utilisateur.component';
import { VueLoginComponent } from './utilisateur/vue-login/vue-login.component';
import { ModalInscriptionComponent } from './modal/modal-inscription/modal-inscription.component';


registerLocaleData(localeFr);

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
    VueEquipeOfClubComponent,
    VueJoueurOfClubComponent,
    VueCreateJoueurComponent,
    VueEditJoueurComponent,
    VueJoueurOfEquipeComponent,
    VueMatchOfClubComponent,
    VueMatchOfEquipeComponent,
    VueEventOfClubComponent,
    VueEventOfEquipeComponent,
    CalendarHeaderComponent,
    VueCreateEventOfClubComponent,
    VueCreateEventOfEquipeComponent,
    AutocompletecityComponent,
    ModalModificationEventComponent,
    ModalEditEventClubComponent,
    ModalEditEventEquipeComponent,
    VueParametreClubComponent,
    VueAjoutSalleClubComponent,
    AutocompleteAdresseComponent,
    VueInscriptionUtilisateurComponent,
    ModalLoginComponent,
    VueEventOfJoueurComponent,
    VueEquipeOfJoueurComponent,
    VueProfilUtilisateurComponent,
    VueLoginComponent,
    ModalInscriptionComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgAisModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AuthErrorHandler}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
