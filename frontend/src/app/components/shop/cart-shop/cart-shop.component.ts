import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryProductService } from "src/app/services/category-product.service";
import { Cart } from "../../../models/cart.model";
import { KhachhangService } from "src/app/services/khachhang.service";

@Component({
  selector: "app-cart-shop",
  templateUrl: "./cart-shop.component.html",
  styleUrls: ["./cart-shop.component.css"],
  providers: [CategoryProductService]
})
export class CartShopComponent implements OnInit {
  carts: Array<Cart> = [];
  totalPrice: any = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cpService: CategoryProductService,
    private khService: KhachhangService,
    private router: Router
  ) {
    khService.getDataKH();
  }

  ngOnInit() {
    this.getData_Order_TotalPrice();

  }
  getData_Order_TotalPrice() {
    this.carts = JSON.parse(localStorage.cart || null) || []
    this.setTotalPrice();
    this.getTotalPrice();
  }
  deleteCart() {
    if (confirm("Bạn có chắc chắc muốn xóa giỏ hàng ?")) {
      localStorage.cart = null;
      this.getData_Order_TotalPrice()
    }
  }

  removeItemInCart(id: String) {
    if (confirm("Bạn có chắc chắc muốn xóa sản phẩm này ?")) {
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
    this.router.navigateByUrl('/giohang')
  }
  setTotalPrice() {
    if (JSON.parse(localStorage.cart || null)) {
      this.totalPrice = 0;
      let order = JSON.parse(localStorage.cart);
      if (order.length > 0) {
        for (var i = 0; i < order.length; i++) {
          let item = order[i];
          this.totalPrice += item.price * item.qty;
          localStorage.totalprice = JSON.stringify(this.totalPrice);
        }
      } else {
        localStorage.totalprice = JSON.stringify(this.totalPrice);
      }
    }
    else {
      localStorage.totalprice = 0;
    }
  }
  getTotalPrice() {
    this.totalPrice = JSON.parse(localStorage.totalprice)
  }
  setCarts() {
    this.carts = JSON.parse(localStorage.cart);
    // this.cpService.setCountItem(this.carts)
  }
  countItem(cart) {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      count += cart[i].qty
    }
    return count;
  }
}
