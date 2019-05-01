import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueExterneClubComponent } from './vue-externe-club.component';

describe('VueExterneClubComponent', () => {
  let component: VueExterneClubComponent;
  let fixture: ComponentFixture<VueExterneClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueExterneClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueExterneClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
