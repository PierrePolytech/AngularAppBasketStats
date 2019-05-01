import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEquipeOfClubComponent } from './vue-equipe-of-club.component';

describe('VueEquipeOfClubComponent', () => {
  let component: VueEquipeOfClubComponent;
  let fixture: ComponentFixture<VueEquipeOfClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEquipeOfClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEquipeOfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
