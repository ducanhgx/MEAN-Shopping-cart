import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCustomerShopComponent } from './profile-customer-shop.component';

describe('ProfileCustomerShopComponent', () => {
  let component: ProfileCustomerShopComponent;
  let fixture: ComponentFixture<ProfileCustomerShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCustomerShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCustomerShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
