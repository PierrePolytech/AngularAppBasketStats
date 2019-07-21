import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteAdresseComponent } from './autocomplete-adresse.component';

describe('AutocompleteAdresseComponent', () => {
  let component: AutocompleteAdresseComponent;
  let fixture: ComponentFixture<AutocompleteAdresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteAdresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
