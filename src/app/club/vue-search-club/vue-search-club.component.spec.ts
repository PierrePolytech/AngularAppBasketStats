import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueSearchClubComponent } from './vue-search-club.component';

describe('VueSearchClubComponent', () => {
  let component: VueSearchClubComponent;
  let fixture: ComponentFixture<VueSearchClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueSearchClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueSearchClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
