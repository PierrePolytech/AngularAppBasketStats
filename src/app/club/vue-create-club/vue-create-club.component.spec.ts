import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueCreateClubComponent } from './vue-create-club.component';

describe('VueCreateClubComponent', () => {
  let component: VueCreateClubComponent;
  let fixture: ComponentFixture<VueCreateClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueCreateClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueCreateClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
