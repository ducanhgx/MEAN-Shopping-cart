import { Component, OnInit, Input } from "@angular/core";
import { KhachhangService } from "../../services/khachhang.service";
import { CategoryProductService } from "../../services/category-product.service";
import { Khachhang } from "../../models/khachhang.model";
import { Router } from "@angular/router";
import { Cart } from './../../models/cart.model';
@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"]
})
export class ShopComponent implements OnInit {
  khachhang: any;
  cart: number
  constructor(private khService: KhachhangService, private cpService: CategoryProductService, private router: Router) {
    if (khService.khachhang !== null) {
      setInterval(() => {
        this.cart = khService.setCountItemCustomer()
      }, 100)
    }
    else {
      if (JSON.parse(localStorage.cart || null)) {
        setInterval(() => {
          this.cart = cpService.setCountItem(JSON.parse(localStorage.cart || null) || [])
        }, 100)
      }
    }
  }

  ngOnInit() {
    if (this.khService.khachhang != null) {
      this.cart = this.khService.setCountItemCustomer();
    }
    else {
      this.cart = this.cpService.setCountItem(JSON.parse(localStorage.cart || null) || [])
    }
  }
  onLogout() {
    this.khService.onLogout();
  }
}
