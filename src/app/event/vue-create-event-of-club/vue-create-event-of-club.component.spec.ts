import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueCreateEventOfClubComponent } from './vue-create-event-of-club.component';

describe('VueCreateEventOfClubComponent', () => {
  let component: VueCreateEventOfClubComponent;
  let fixture: ComponentFixture<VueCreateEventOfClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueCreateEventOfClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueCreateEventOfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
