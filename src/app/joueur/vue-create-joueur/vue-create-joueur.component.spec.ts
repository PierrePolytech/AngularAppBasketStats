import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueCreateJoueurComponent } from './vue-create-joueur.component';

describe('VueCreateJoueurComponent', () => {
  let component: VueCreateJoueurComponent;
  let fixture: ComponentFixture<VueCreateJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueCreateJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueCreateJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
