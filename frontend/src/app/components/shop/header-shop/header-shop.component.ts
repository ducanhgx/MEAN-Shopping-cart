import { Component, OnInit, Input } from '@angular/core';
import { KhachhangService } from "../../../services/khachhang.service";
import { CategoryProductService } from "../../../services/category-product.service";
import { Khachhang } from "../../../models/khachhang.model";
import { Router } from "@angular/router";
import { Subscription, Subject } from 'rxjs';
import { Cart } from './../../../models/cart.model';
@Component({
  selector: 'header-shop',
  templateUrl: './header-shop.component.html',
  styleUrls: ['./header-shop.component.css'],
  providers: [CategoryProductService]
})
export class HeaderShopComponent implements OnInit {
  khachhang: Khachhang;
  countItem: any = 0;
  @Input() cart: Number;
  constructor(private khService: KhachhangService, private cpService: CategoryProductService, private router: Router) {
  }
  ngOnInit() {
  }


  onLogout() {
    this.khService.onLogout();
  }

}
