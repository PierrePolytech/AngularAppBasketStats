import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueMatchOfClubComponent } from './vue-match-of-club.component';

describe('VueMatchOfClubComponent', () => {
  let component: VueMatchOfClubComponent;
  let fixture: ComponentFixture<VueMatchOfClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueMatchOfClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueMatchOfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
