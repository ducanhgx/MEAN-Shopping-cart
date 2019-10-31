import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CategoryProductService } from "src/app/services/category-product.service";
import { Cart } from "../../../models/cart.model";
import { KhachhangService } from "src/app/services/khachhang.service";

@Component({
  selector: 'app-cart-customer-shop',
  templateUrl: './cart-customer-shop.component.html',
  styleUrls: ['./cart-customer-shop.component.css']
})
export class CartCustomerShopComponent implements OnInit {

  carts: Array<Cart> = [];
  totalPrice: any = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cpService: CategoryProductService,
    private khService: KhachhangService
  ) {
    // khService.getDataKH();
  }

  ngOnInit() {
    this.carts = JSON.parse(localStorage.cart || null) || []
    this.totalPrice = localStorage.totalprice || 0
    // this.getData_Order_TotalPrice();
  }
  // getData_Order_TotalPrice() {
  //   this.khService.getUserProfile().subscribe(res => {
  //     this.carts = res["result"]["order"];
  //     this.totalPrice = res["result"].totalprice;
  //   });
  // }
  deleteCart() {
    if (confirm("Bạn có chắc chắc muốn xóa giỏ hàng ?")) {
      localStorage.cart = null;
      this.setTotalPrice();
      this.setCarts();

    }
  }
  removeItemInCart(id: String) {
   if(confirm('Bạn có chắc muốn xóa sản phẩm này ?')){
    let cart = JSON.parse(localStorage.cart);
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].item._id === id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.cart = JSON.stringify(cart);
    this.setCarts();
    this.setTotalPrice();
   }
  }

  plusItem(i: number) {
    let cart: Array<any> = JSON.parse(localStorage.cart);
    if (cart[i].item.soluongton > cart[i].qty) {
      cart[i].qty += 1;
      localStorage.cart = JSON.stringify(cart);
    }
    this.setCarts();
    this.setTotalPrice();
  }
  minusItem(i) {
    let cart = JSON.parse(localStorage.cart);
    if (cart[i].qty > 1) {
      cart[i].qty -= 1;
      localStorage.cart = JSON.stringify(cart);
    } else {
      cart[i].qty = 1;
      localStorage.cart = JSON.stringify(cart);
    }
    this.setCarts();
    this.setTotalPrice();
  }
  setTotalPrice() {
    this.totalPrice = 0;
    let order = JSON.parse(localStorage.cart);
    if (order) {
      for (var i = 0; i < order.length; i++) {
        let item = order[i];
        this.totalPrice += item.price * item.qty;
        localStorage.totalprice = JSON.stringify(this.totalPrice);
      }
      this.totalPrice = localStorage.totalprice
    }
    else{
      localStorage.totalprice = JSON.stringify(this.totalPrice);
    }
  }
  async setCarts() {
    this.carts = JSON.parse(localStorage.cart) || [];
    const Order = {
      order: this.carts,
      totalprice: this.totalPrice
    }
    await this.khService
      .putOrderKhachhang(Order)
      .subscribe(res => {
        this.carts = JSON.parse(localStorage.cart);
      });
  }
}
