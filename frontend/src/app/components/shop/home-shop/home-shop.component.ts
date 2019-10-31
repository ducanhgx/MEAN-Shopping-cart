import { Component, OnInit } from "@angular/core";
import { Category } from "../../../models/danhmuc.model";
import { CategoryProductService } from "src/app/services/category-product.service";
import { Product } from "./../../../models/sanpham.model";
import { ActivatedRoute } from "@angular/router";
import { Cart } from "../../../models/cart.model";
import { KhachhangService } from "src/app/services/khachhang.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.css']
})
export class HomeShopComponent implements OnInit {
  categories: Category[];
  products: Product[] = [];
  cart: any = [];
  totalPrice: any = 0;
  productFake: Product[] = []
  selectedIndex: Number = -1;
  value: any = null;
  sort: Number = null;
  constructor(
    private khService: KhachhangService,
    private activatedRoute: ActivatedRoute,
    private cpService: CategoryProductService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getData()
  }
  async getData() {
    const datacategorys = await this.cpService.getDataCategories().toPromise()
    this.categories = datacategorys['result'].filter(e => e.trangthaidm)
    const dataproducts = await this.cpService.getDataProducts().toPromise()
    this.products = dataproducts['result'].filter(e => e.trangthaisp)
    this.productFake = this.products;
  }
  async onProductCategory(category: Category, i: Number) {
    this.value = null
    this.sort = null
    if (i === -1) {
      this.selectedIndex = -1
      const dataproducts = await this.cpService.getDataProducts().toPromise()
      this.products = dataproducts['result'].filter(e => e.trangthaisp)
      this.productFake = this.products
    }
    else {
      this.selectedIndex = i;
      const data = await this.cpService.getDataProductsWithCategory(category.tendm).toPromise()
      this.products = data['result']
      this.productFake = this.products
    }

  }
  addtocart(product: Product) {
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
        if (index == -1) {
          order.push(cart);
          localStorage.cart = JSON.stringify(order);
          this.loadCart();
        } else {
          let item: Cart = order[index];
          if (item.qty < item.item.soluongton) {
            item.qty = Number(item.qty) + 1;
            order[index] = item;
            localStorage.cart = JSON.stringify(order);
            this.loadCart();
          }
          else {
            alert('số lượng quá số lượng hiện có !')
          }
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
      if (cartLocalStorage === null) {
        let order: any = [];
        order.push(cart);
        localStorage.cart = JSON.stringify(order);;
        this.cpService.subject.next(1)
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
        // console.log(index);
        if (index == -1) {
          // console.log("khác");
          order.push(cart);
          localStorage.cart = JSON.stringify(order);
        } else {
          // console.log("cùng");
          let item: Cart = order[index];
          if (item.qty < item.item.soluongton) {
            item.qty = Number(item.qty) + 1;
            order[index] = item;
            localStorage.cart = JSON.stringify(order);
          }
          else {
            alert('số lượng quá số lượng hiện có !')
          }
        }
        this.cpService.subject.next(2)
        this.router.navigateByUrl("/giohang");
      }
    }
  }
  countItem(cart) {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      count += cart[i].qty
    }
    return count;
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
      .putOrderKhachhang({
        order: this.cart,
        totalPrice: this.totalPrice
      })
      .subscribe(res => console.log(res));
  }
  detailproduct(product: Product) {
    this.router.navigateByUrl(`sanpham/${product._id}`)
  }

  filterChanged(e) {
    if (e.value === 1) {
      this.products = this.products.sort((a: any, b: any) => {
        return a.giaspchuagiam - b.giaspchuagiam;
      })
    }
    else {
      this.products = this.products.sort((a: any, b: any) => {
        return b.giaspchuagiam - a.giaspchuagiam;
      })
    }
  }
  filterKeyup(value) {
    const products = this.productFake
    this.cpService.productsFillter(value).subscribe(res => {
      if (res['result'].length > 0) {
        this.products = res['result'];
      }
      else {
        this.products = products;
      }
    })
  }

  OnChangeFilterPrice(start:number, finish:number) {
    start *= 1000000;
    finish *= 1000000;
    const products = this.productFake
    if (start > 0 && finish > 0) {
      const arrFilter = this.productFake.filter(e => ((start <= e.giaspchuagiam) && (e.giaspchuagiam <= finish)))
      this.productFake = products
      this.products = arrFilter
    }
    else {
      if (finish === 5000000) {
        const arrFilter = this.productFake.filter(e => ((e.giaspchuagiam <= finish)))
        this.productFake = products
        this.products = arrFilter
      }
      else {
        const arrFilter = this.productFake.filter(e => ((finish <= e.giaspchuagiam)))
        this.productFake = products
        this.products = arrFilter
      }
    }
  }

 
}
