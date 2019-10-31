import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactShopComponent } from './contact-shop.component';

describe('ContactShopComponent', () => {
  let component: ContactShopComponent;
  let fixture: ComponentFixture<ContactShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
