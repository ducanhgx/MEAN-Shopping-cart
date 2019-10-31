import { Component, OnInit } from '@angular/core';
import { CategoryProductService } from "../../../services/category-product.service";
import { Category } from './../../../models/danhmuc.model';
@Component({
  selector: 'footer-shop',
  templateUrl: './footer-shop.component.html',
  styleUrls: ['./footer-shop.component.css']
})
export class FooterShopComponent implements OnInit {
  categories : Category[];
  constructor(
    private cpService : CategoryProductService
  ) { }

  ngOnInit() {
    this.getData()
  }
 async getData(){
    const data = await this.cpService.getDataCategories().toPromise()
    this.categories = data['result'].filter(e => e.trangthaidm)
  }
}
