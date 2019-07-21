import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueParametreClubComponent } from './vue-parametre-club.component';

describe('VueParametreClubComponent', () => {
  let component: VueParametreClubComponent;
  let fixture: ComponentFixture<VueParametreClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueParametreClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueParametreClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
