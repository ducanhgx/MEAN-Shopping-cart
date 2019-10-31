import { Component, OnInit, Input, Output } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { CategoryProductService } from "./../../../../services/category-product.service";
import { Product } from './../../../../models/sanpham.model';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: String
  constructor(
    private cpService: CategoryProductService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  this.getDataProductID()
  }
  getDataProductID(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }
}
