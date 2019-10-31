import { Component, OnInit } from "@angular/core";
import { Category } from "../../../models/danhmuc.model";
import { CategoryProductService } from "src/app/services/category-product.service";
import { Product } from "./../../../models/sanpham.model";
import { ActivatedRoute } from "@angular/router";
import { Cart } from "../../../models/cart.model";
import { KhachhangService } from "src/app/services/khachhang.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-product-shop",
  templateUrl: "./product-shop.component.html",
  styleUrls: ["./product-shop.component.css"]
})
export class ProductShopComponent implements OnInit {
  categorys: Category;
  products: Product[] = [];
  cart: any = [];
  totalPrice: any = 0;
  productFake: Product[] = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private cpService: CategoryProductService,
    private khService: KhachhangService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.cpService
      .getDataCategories()
      .subscribe(res => {
        this.categorys = res["result"]
        this.router.navigateByUrl(`/sanpham/${this.categorys[0].tendm}`)
      });
    this.activatedRoute.params.subscribe(params => {
      let tendm = params["tendm"];
      this.cpService
        .getDataProductsWithCategory(tendm)
        .subscribe(res => {
          this.products = res["result"];
          this.productFake = this.products;
        });
    });

  }
  addtocart(product: Product) {
    console.log(this.khService.khachhang !== null)
    if (this.khService.khachhang !== null) {
      let cart: Cart = {
        item: product,
        qty: 1,
        price: product.giaspdagiam
      };
      let cartLocalStorage = JSON.parse(localStorage.cart) || null
      if (cartLocalStorage === null) {
        let order: any = [];
        order.push(cart);
        localStorage.cart = JSON.stringify(order);
        this.loadCart();
        setTimeout(() => {
          this.router.navigateByUrl("/giohangkhachhang");
        }, 100);
      } else {
        let order: any = JSON.parse(localStorage.cart);
        let index: number = -1;
        for (var i = 0; i < order.length; i++) {
          if (order[i].item._id === product._id) {
            index = i;
            break;
          }
        }
        console.log(index);
        if (index == -1) {
          order.push(cart);
          localStorage.cart = JSON.stringify(order);
          this.loadCart();
        } else {
          let item: Cart = order[index];
          item.qty = Number(item.qty) + 1;
          order[index] = item;
          localStorage.cart = JSON.stringify(order);
          this.loadCart();
        }
      }
      setTimeout(() => {
        this.router.navigateByUrl("/giohangkhachhang");
      }, 100);
    } else {
      let cart: Cart = {
        item: product,
        qty: 1,
        price: product.giaspdagiam
      };
      let cartLocalStorage = JSON.parse(localStorage.cart || null) || null
      console.log(cartLocalStorage)
      if (cartLocalStorage  === null) {
        let order: any = [];
        order.push(cart);
        localStorage.cart = JSON.stringify(order);;
        setTimeout(() => {
          this.router.navigateByUrl("/giohang");
        }, 100);
      } else {
        let order: any = JSON.parse(localStorage.cart);
        let index: number = -1;
        for (var i = 0; i < order.length; i++) {
          if (order[i].item._id === product._id) {
            index = i;
            break;
          }
        }
        console.log(index);
        if (index == -1) {
          // console.log("khác");
          order.push(cart);
          localStorage.cart = JSON.stringify(order);
        } else {
          // console.log("cùng");
          let item: Cart = order[index];
          item.qty = Number(item.qty) + 1;
          order[index] = item;
          localStorage.cart = JSON.stringify(order);

        }
      this.router.navigateByUrl("/giohang");
    }
    }
  }
  async loadCart() {
    this.cart = [];
    this.totalPrice = 0;
    let order = JSON.parse(localStorage.cart);
    for (var i = 0; i < order.length; i++) {
      let item = order[i];
      this.cart.push({
        item: item.item,
        qty: item.qty,
        price: item.price
      });
      this.totalPrice += item.price * item.qty;
      localStorage.totalprice = JSON.stringify(this.totalPrice);
    }
    let res = await this.khService.getUserProfile().toPromise();
    await this.khService
      .putOrderKhachhang( {
        order: this.cart,
        totalPrice: this.totalPrice
      })
      .subscribe(res => console.log(res));
  }

  onKey(event: any) {
    // without type info
    let product_fillter = event.target.value;
    this.cpService
      .productsFillter(product_fillter)
      .subscribe((res: any) => {
        if (res['result'].length > 0) {
          this.products = res["result"]
        }
        else {
          this.products = this.productFake;
        }
      });
  }
  detailproduct(product : Product){
    this.router.navigateByUrl(`sanpham/${product.tensp}/${product._id}`)
  }
}
