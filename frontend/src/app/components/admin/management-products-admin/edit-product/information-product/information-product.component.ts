import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { CategoryProductService } from "./../../../../../services/category-product.service";
import { Product } from './../../../../../models/sanpham.model';
import { Category } from './../../../../../models/danhmuc.model';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'information-product',
  templateUrl: './information-product.component.html',
  styleUrls: ['./information-product.component.css']
})
export class InformationProductComponent implements OnInit {
  @Input() id: String
  categorys: Category[]
  showloading: Boolean = false;
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

  constructor(
    private cpService: CategoryProductService,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
    this.showloading = true
    this.cpService.getDataProductId(this.id).subscribe( async res => {
      this.product = await res['result']
      setTimeout(() => this.showloading = false, 1000)
    })
    this.cpService.getDataCategories().subscribe(res => {
      this.categorys = res['result']
    })
  }
  onSubmit(id: String, form: NgForm) {
    this.cpService.putProduct(id, form.value).subscribe(res => {
      this.toastr.success('Cập nhật thành công')
      this.router.navigateByUrl(`/quantri/quanlysanpham`)
    })
  }

}
