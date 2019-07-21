import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueInscriptionUtilisateurComponent } from './vue-inscription-utilisateur.component';

describe('VueInscriptionUtilisateurComponent', () => {
  let component: VueInscriptionUtilisateurComponent;
  let fixture: ComponentFixture<VueInscriptionUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueInscriptionUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueInscriptionUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
