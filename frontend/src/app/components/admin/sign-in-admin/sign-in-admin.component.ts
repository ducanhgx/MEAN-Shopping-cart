import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AdminService } from "../../../services/admin.service";
@Component({
  selector: "sign-in-admin",
  templateUrl: "./sign-in-admin.component.html",
  styleUrls: ["./sign-in-admin.component.css"]
})
export class SignInAdminComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) { 
    if(this.adminService.getToken()){
      this.router.navigateByUrl('/quantri/quanlydanhmuc')
    }
  }
  model = {
    email: "",
    password: ""
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() { }

  onSubmit(form: NgForm) {
    this.adminService.login(form.value).subscribe(res => {
      this.adminService.setToken(res["token"]);
      this.router.navigateByUrl("/quantri/quanlydanhmuc");
      form.resetForm();
    },
    err =>{
      alert('email hoặc mật khẩu không đúng !')
      location.reload(true)
    });
  }
}
