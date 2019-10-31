import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { KhachhangService } from '../../../services/khachhang.service'
import { Router } from "@angular/router";
import { Cart } from "../../../models/cart.model";
import { Order } from "../../../models/order.model"
import { OrderService } from '../../../services/order.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-check-products-shop',
  templateUrl: './check-products-shop.component.html',
  styleUrls: ['./check-products-shop.component.css']
})
export class CheckProductsShopComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = /^[0-9.]+$/
  carts: Array<Cart> = [];
  totalPrice: any = 0;
  userProfile: any = null
  orderCustomer: Order = {
    name: '',
    phone: '',
    email: '',
    address: '',
    note: "",
    order: [],
    totalprice: 0
  }
  constructor(
    private khService: KhachhangService,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    if (this.khService.khachhang != null) {
      console.log('vô')
      this.khService
        .getUserProfile()
        .subscribe(res => {
          this.userProfile = res["result"];
          this.orderCustomer = {
            name: this.userProfile.name,
            phone: this.userProfile.phone,
            email: this.userProfile.email,
            address: this.userProfile.address,
            note: "",
            order: this.userProfile.order,
            totalprice: this.userProfile.totalprice
          }
        });
    }
    this.carts = JSON.parse(localStorage.cart)
    this.totalPrice = JSON.parse(localStorage.totalprice)

  }
  onSubmit(form: NgForm) {
    const order = { order: this.carts, totalprice: this.totalPrice }
    this.orderCustomer = Object.assign({}, form.value, order)
    this.orderService.postOrder(this.orderCustomer).subscribe(res => {
      localStorage.cart = null
      localStorage.totalprice = 0
      if (this.userProfile != null) {
        console.log('vô nhé')
        this.khService.updateTransactionHistoryCustomer(order).subscribe(res => {
          console.log(res)
        })
      }
      this.toastr.success('Đặt hàng thành công ! ', 'Thông báo')
      this.resetForm(form)
      this.router.navigateByUrl('/trangchu')
    })
  }

  resetForm(form: NgForm) {
    if (this.userProfile) {
      this.orderCustomer = {
        name: this.userProfile.name || '',
        phone: this.userProfile.phone || '',
        email: this.userProfile.email || '',
        address: this.userProfile.address || '',
        note: "",
        order: this.userProfile.order || [],
        totalprice: this.userProfile.totalprice || 0
      }
    }
    form.resetForm();
  }
}
