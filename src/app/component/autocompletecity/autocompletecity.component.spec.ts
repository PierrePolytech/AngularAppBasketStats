import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletecityComponent } from './autocompletecity.component';

describe('AutocompletecityComponent', () => {
  let component: AutocompletecityComponent;
  let fixture: ComponentFixture<AutocompletecityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompletecityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletecityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
