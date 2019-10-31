import { Component, OnInit } from "@angular/core";
import { KhachhangService } from "src/app/services/khachhang.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-profile-customer-shop",
  templateUrl: "./profile-customer-shop.component.html",
  styleUrls: ["./profile-customer-shop.component.css"]
})
export class ProfileCustomerShopComponent implements OnInit {
  userProfile: any = {};
  openEditProfile: boolean = false;
  constructor(private khService: KhachhangService) {}

  ngOnInit() {
    this.khService
      .getUserProfile()
      .subscribe(res => (this.userProfile = res["result"]));
  }
  openEdit() {
    this.openEditProfile = true;
  }
  onSubmit(form: NgForm) {
    this.khService.putProfileKhachhang(form.value).subscribe(res => console.log(res))
    this.khService.getDataKH();
    this.openEditProfile = false;
  }
}
