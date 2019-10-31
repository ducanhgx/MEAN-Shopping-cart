import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { KhachhangService } from '../../../services/khachhang.service'
import { Router } from "@angular/router";
@Component({
  selector: 'app-sign-up-shop',
  templateUrl: './sign-up-shop.component.html',
  styleUrls: ['./sign-up-shop.component.css']
})
export class SignUpShopComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private khService:KhachhangService,private router : Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.khService.postKhachhang(form.value).subscribe(
      res => {
        this.router.navigateByUrl('');
      },
      err => {
        if (err.status === 422) {
          alert(err.error)
          this.khService.selectedKhachhang.email = ''
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.khService.selectedKhachhang = {
      email: "",
      name: "",
      password: "",
      address: "",
      phone: "",
      ordersp: []
    };
    form.resetForm();
  }
}
