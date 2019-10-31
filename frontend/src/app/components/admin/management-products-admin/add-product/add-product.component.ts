import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { CategoryProductService } from "./../.../../../../../services/category-product.service";
import { Product } from './../../../../models/sanpham.model';
import { Category } from './../../../../models/danhmuc.model';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUploader, FileSelectDirective, FileLikeObject } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // UploadURL: any;
  // public uploader: FileUploader
  // public hasBaseDropZoneOver: boolean = false;
  categorys: Category[]
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
  formData: any;
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  amount;
  constructor(
    private cpService: CategoryProductService,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.cpService.getDataCategories().subscribe(res => {
      this.categorys = res['result']
    })

  }
  OnSubmit(product: NgForm) { 
    // console.log(product, this.fileToUpload)
    this.cpService.postFile(product.value, this.fileToUpload).subscribe(
      data => {
       this.toastr.success("Thêm sản phẩm thành công")
        product.resetForm();
        this.imageUrl = "/assets/img/default-image.png";
        this.router.navigateByUrl('/quantri/quanlysanpham')
      }
    );
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

}
