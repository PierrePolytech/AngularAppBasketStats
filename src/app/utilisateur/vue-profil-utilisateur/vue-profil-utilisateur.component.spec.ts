import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueProfilUtilisateurComponent } from './vue-profil-utilisateur.component';

describe('VueProfilUtilisateurComponent', () => {
  let component: VueProfilUtilisateurComponent;
  let fixture: ComponentFixture<VueProfilUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueProfilUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueProfilUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
