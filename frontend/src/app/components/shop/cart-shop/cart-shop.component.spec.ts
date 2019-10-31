import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShopComponent } from './cart-shop.component';

describe('CartShopComponent', () => {
  let component: CartShopComponent;
  let fixture: ComponentFixture<CartShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
