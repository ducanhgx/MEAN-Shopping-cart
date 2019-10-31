import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductService } from "./../../../services/category-product.service";
import { Product } from './../../../models/sanpham.model';
declare var $: any;
import { Cart } from "../../../models/cart.model";
import { KhachhangService } from 'src/app/services/khachhang.service';
@Component({
  selector: 'app-detail-product-shop',
  templateUrl: './detail-product-shop.component.html',
  styleUrls: ['./detail-product-shop.component.css']
})
export class DetailProductShopComponent implements OnInit {
  product: Product = {
    tensp: '',
    motatomtatsp: '',
    motachitietsp: '',
    soluongton: 0,
    giaspchuagiam: 0,
    giaspdagiam: 0,
    hinhanhsp: [],
    tendm: ''
  }
  products: Product[] = []
  avtarProduct: String = ''
  images: any[] = []
  cart: any = [];
  totalPrice: any = 0;
  constructor(
    private cpService: CategoryProductService,
    private activatedRoute: ActivatedRoute,
    private khService: KhachhangService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getDataProductID()
  }
  getDataProductID() {
    this.activatedRoute.params.subscribe(async params => {
      const res = await this.cpService.getDataProductId(params['id']).toPromise()
      this.product = await res['result']
      this.getDataProducts(this.product.tendm, this.product.tensp)
      const arrImage = this.product.hinhanhsp.filter(e => e.status)
      this.images = this.product.hinhanhsp.filter(e => !e.status)
      this.avtarProduct = arrImage[0].path
    })
  }
  async getDataProducts(tendm: String, tensp: String) {
    const res = await this.cpService.getDataProductsWithCategory(tendm).toPromise();
    const products = res['result']
    this.products = products.filter(e => e.tensp !== tensp)
  }

  addtocart(product: Product) {
    if (this.khService.khachhang !== null) {
      let cart: Cart = {
        item: product,
        qty: 1,
        price: product.giaspdagiam
      };
      let cartLocalStorage = JSON.parse(localStorage.cart || null)
      if (cartLocalStorage === null) {
        // console.log("null");
        let order: any = [];
        order.push(cart);
        localStorage.cart = JSON.stringify(order);
        this.loadCart();
        setTimeout(() => {
          this.router.navigateByUrl("/giohang");
        }, 100);
      } else {
        // console.log("không null");
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
          this.loadCart();
        } else {
          // console.log("cùng");
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
      let cartLocalStorage = JSON.parse(localStorage.cart || null) 
      if (cartLocalStorage  === null) {
        // console.log("null");
        let order: any = [];
        order.push(cart);
        localStorage.cart = JSON.stringify(order);;
        setTimeout(() => {
          this.router.navigateByUrl("/giohang");
        }, 100);
      } else {
        // console.log("không null");
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
          if (item.qty < item.item.soluongton) {
            item.qty = Number(item.qty) + 1;
            order[index] = item;
            localStorage.cart = JSON.stringify(order);
          }
          else {
            alert('số lượng bạn thêm vào giỏ đã quá số lượng hiện có !')
          };

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
      localStorage.totalPrice = JSON.stringify(this.totalPrice);
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
    this.router.navigateByUrl(`sanpham/${product.tensp}/${product._id}`)
  }
}
