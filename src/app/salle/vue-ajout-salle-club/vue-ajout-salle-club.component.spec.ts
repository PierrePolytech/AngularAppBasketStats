import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueAjoutSalleClubComponent } from './vue-ajout-salle-club.component';

describe('VueAjoutSalleClubComponent', () => {
  let component: VueAjoutSalleClubComponent;
  let fixture: ComponentFixture<VueAjoutSalleClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueAjoutSalleClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueAjoutSalleClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
