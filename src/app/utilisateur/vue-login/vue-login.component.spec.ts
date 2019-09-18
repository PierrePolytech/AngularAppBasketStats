import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueLoginComponent } from './vue-login.component';

describe('VueLoginComponent', () => {
  let component: VueLoginComponent;
  let fixture: ComponentFixture<VueLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
