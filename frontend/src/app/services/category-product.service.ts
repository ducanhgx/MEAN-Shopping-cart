import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../models/danhmuc.model";
import { Product } from "../models/sanpham.model";
import { environment } from "../../environments/environment";
import { Cart } from './../models/cart.model';
import { Observable, Subject } from 'rxjs';
import { KhachhangService } from 'src/app/services/khachhang.service';
@Injectable({
  providedIn: "root"
})
export class CategoryProductService {
  subject = new Subject<any>();
  numberItem: Number = 0
  countItem: Number = 0;
  constructor(private http: HttpClient, private khService: KhachhangService) {
    //  if(JSON.parse(localStorage.cart || null)){
    //   setInterval(() => {
    //     this.setCountItem(JSON.parse(localStorage.cart) || [])
    //   }, 500);
    //  }
  }
  setCountItemCustomer(){
    if (this.khService.khachhang !== null) {
      let count = 0;
      let cartCustomer = JSON.parse(localStorage.cart)
      for (let i = 0; i < cartCustomer.length; i++) {
        count += cartCustomer[i].qty
      }
      return count;
    }
  }
  setCountItem(cart) {
      let count = 0;
      for (let i = 0; i < cart.length; i++) {
        count += cart[i].qty
      }
      return count
  }

  //categorys

  getDataCategories() {
    return this.http.get(environment.apiBaseUrl + "/categoryProducts");
  }

  getDataProductsWithCategory(tendm: String) {
    return this.http.get<Category>(
      environment.apiBaseUrl + `/products/${tendm}`
    );
  }

  // Products
  getDataProducts() {
    return this.http.get<Product>(environment.apiBaseUrl + "/products");
  }
  postProduct(product: Product) {
    return this.http.post(environment.apiBaseUrl + `/products`, product)
  }
  postFile(product: any, fileToUpload: File) {

    const formData: FormData = new FormData();
    formData.append('myimage', fileToUpload, fileToUpload.name);
    formData.append('product', JSON.stringify(product));
    console.log(formData)
    return this.http
      .post(environment.apiBaseUrl + `/products`, formData);
  }
  putProduct(id: String, product: Product) {
    return this.http.put(environment.apiBaseUrl + `/products/${id}`, product)
  }
  getDataProductId(id: String) {
    return this.http.get<Product>(environment.apiBaseUrl + `/product/${id}`);
  }
  toggleStatusProduct(id: String) {
    return this.http.get(environment.apiBaseUrl + `/product/toggle/${id}`)
  }
  deleteProduct(id: String) {
    return this.http.delete(environment.apiBaseUrl + `/products/${id}`)
  }
  productsFillter(product_fillter) {
    return this.http.get<Product>(
      environment.apiBaseUrl + `/products/productsfillter/${product_fillter}`
    );
  }
  putCateProduct(category) {
    return this.http.put(environment.apiBaseUrl + `/categoryProducts/${category._id}`, category)
  }
  putcategoryProducts(tendmcu, tendmmoi, datadm) {
    return this.http.put(environment.apiBaseUrl + `/products/${tendmcu}/${tendmmoi}`, datadm)
  }
  postCategory(category: Category) {
    return this.http.post(environment.apiBaseUrl + `/categoryProduct`, category)
  }
  deleteCategory(id: String) {
    return this.http.delete(environment.apiBaseUrl + `/categoryProducts/${id}`)
  }
  toggleCategory(id: string) {
    return this.http.get(environment.apiBaseUrl + `/toggleCategory/${id}`)
  }
  removeImageProduct(id: String, index: Number) {
    return this.http.get(environment.apiBaseUrl + `/product/image/${id}/${index}`)
  }
  toggleImageProduct(id: String) {
    return this.http.get(environment.apiBaseUrl + `/product/image/update/status/${id}`)
  }
}
