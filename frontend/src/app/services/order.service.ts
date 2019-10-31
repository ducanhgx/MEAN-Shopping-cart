import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Order } from "../models/order.model";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) {

  }
  getDataOrders() {
    return this.http.get(environment.apiBaseUrl + `/orders`)
  }
  getDataOrder() {
    return this.http.get(environment.apiBaseUrl + `/order`)
  }
  putStatusOrder(id: String, status: any) {
    return this.http.put(environment.apiBaseUrl + `/orders/${id}`, status)
  }
  // putQtyProduct(id:String,status) {
  //   return this.http.put(environment.apiBaseUrl + `/orders/update/${id}`, status)
  // }
  postOrder(order: Order) {
    return this.http.post(environment.apiBaseUrl + `/orders`, order)
  }
  deleteOrder(id: String) {
    return this.http.delete(environment.apiBaseUrl + `/orders/${id}`)
  }
}
