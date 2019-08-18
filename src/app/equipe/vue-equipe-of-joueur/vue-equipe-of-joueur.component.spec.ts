import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEquipeOfJoueurComponent } from './vue-equipe-of-joueur.component';

describe('VueEquipeOfJoueurComponent', () => {
  let component: VueEquipeOfJoueurComponent;
  let fixture: ComponentFixture<VueEquipeOfJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEquipeOfJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEquipeOfJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
