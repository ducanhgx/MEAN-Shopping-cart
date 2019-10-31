import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductShopComponent } from './detail-product-shop.component';

describe('DetailProductShopComponent', () => {
  let component: DetailProductShopComponent;
  let fixture: ComponentFixture<DetailProductShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProductShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
