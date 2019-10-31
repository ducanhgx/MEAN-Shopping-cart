import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCustomerShopComponent } from './cart-customer-shop.component';

describe('CartCustomerShopComponent', () => {
  let component: CartCustomerShopComponent;
  let fixture: ComponentFixture<CartCustomerShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCustomerShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCustomerShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
