import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { KhachhangService } from './../../../services/khachhang.service'
@Component({
  selector: 'app-sign-in-shop',
  templateUrl: './sign-in-shop.component.html',
  styleUrls: ['./sign-in-shop.component.css']
})
export class SignInShopComponent implements OnInit {
  kh = {
    email: '',
    password: ''
  }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private khService: KhachhangService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.khService.login(form.value).subscribe(
      async  res => {
        await this.khService.setToken(res['token']);
        await this.khService.getDataKH()

        alert('Đăng nhập thành công !')
        setTimeout(() => {
          this.router.navigateByUrl('/trangchu');
          this.resetForm(form)
        }, 200)

      },
      err => {
        alert('emai hoặc mật khẩu không đúng !')
        location.reload(true)
      }
    );
  }
  resetForm(form: NgForm) {
    this.kh = {
      email: '',
      password: ''
    }
    form.resetForm();
  }
}
