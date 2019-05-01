import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEditClubComponent } from './vue-edit-club.component';

describe('VueEditClubComponent', () => {
  let component: VueEditClubComponent;
  let fixture: ComponentFixture<VueEditClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEditClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEditClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
