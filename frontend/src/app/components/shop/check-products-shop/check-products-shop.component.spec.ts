import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckProductsShopComponent } from './check-products-shop.component';

describe('CheckProductsShopComponent', () => {
  let component: CheckProductsShopComponent;
  let fixture: ComponentFixture<CheckProductsShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckProductsShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckProductsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
