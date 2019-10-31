import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Admin } from "../models/admin.model";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedUser: Admin = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient, private router: Router) {

   }

  //HttpMethods

  postUser(admin: Admin) {
    return this.http.post(environment.apiBaseUrl + '/admin/register', admin, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/admin/authenticate', authCredentials, this.noAuthHeader);
  }

  getAdminProfile() {
    return this.http.get(environment.apiBaseUrl + '/adminProfile');
  }

  getCustomers() {
    return this.http.get(environment.apiBaseUrl + `/customers`)
  }
  deleteCustomer(id: String) {
    return this.http.delete(environment.apiBaseUrl + `/customers/${id}`)
  }
  onLogout() {
    localStorage.clear();
    // this.deleteToken();
    // this.deleteCart()
    this.router.navigateByUrl("/quantri/dangnhap");

  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token_a', token);
  }

  getToken() {
    return localStorage.getItem('token_a');
  }

  deleteToken() {
    localStorage.removeItem('token_admin');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
