import { Injectable } from "@angular/core";
import { Khachhang } from "../models/khachhang.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class KhachhangService {
  selectedKhachhang: Khachhang = {
    email: "",
    name: "",
    password: "",
    address: "",
    phone: "",
    ordersp: []
  };
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  khachhang: any = null;
  constructor(private http: HttpClient, private router: Router) {
    setTimeout(() => {
      this.getDataKH();
    }, 500);
  }

  //HttpMethods

  postKhachhang(kh: Khachhang) {
    return this.http.post(
      environment.apiBaseUrl + "/register",
      kh,
      this.noAuthHeader
    );
  }

  login(authCredentials) {
    return this.http.post(
      environment.apiBaseUrl + "/authenticate",
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + "/customerprofile");
  }
  putOrderKhachhang(order) {
    return this.http.put(
      environment.apiBaseUrl + `/customerorder`,
      order
    );
  }
  putProfileKhachhang(profile) {
    return this.http.put(
      environment.apiBaseUrl + `/customerprofile`,
      profile
    );
  }
  updateTransactionHistoryCustomer(order) {
    return this.http.put(environment.apiBaseUrl + `/customertransactionhistory`, order)
  }
  setCountItemCustomer() {
    if (this.khachhang !== null) {
      let count = 0;
          let cartCustomer = JSON.parse(localStorage.cart) || []
          for(let i=0;i<cartCustomer.length ; i++){
            count += cartCustomer[i].qty;
          }
      return count
    }
  }
  getDataKH() {
    if (this.getToken()) {
      this.getUserProfile().subscribe(res => {
        this.khachhang = res["result"];
        if (res["result"]["order"] !== null) {
          localStorage.cart = JSON.stringify(res["result"]["order"]);
          localStorage.totalprice = JSON.stringify(res["result"].totalprice);
        } else {
          localStorage.cart = null;
          localStorage.totalprice = JSON.stringify(res["result"].totalprice);
        }
      });
    }
    else {
      // console.log('else')
    }
  }
  onLogout() {
    localStorage.clear();
    // this.deleteToken();
    // this.deleteCart()
    this.router.navigateByUrl("");
    this.khachhang = null;
    // location.reload(true);
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem("token_u", token);
  }

  getToken() {
    return localStorage.getItem("token_u");
  }

  deleteCart() {
    localStorage.removeItem("cart");
  }
  deleteToken() {
    localStorage.removeItem("token_u");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
