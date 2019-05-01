import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEventOfClubComponent } from './vue-event-of-club.component';

describe('VueEventOfClubComponent', () => {
  let component: VueEventOfClubComponent;
  let fixture: ComponentFixture<VueEventOfClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEventOfClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEventOfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
