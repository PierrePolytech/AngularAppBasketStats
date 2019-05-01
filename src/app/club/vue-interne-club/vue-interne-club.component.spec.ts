import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueInterneClubComponent } from './vue-interne-club.component';

describe('VueInterneClubComponent', () => {
  let component: VueInterneClubComponent;
  let fixture: ComponentFixture<VueInterneClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueInterneClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueInterneClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
