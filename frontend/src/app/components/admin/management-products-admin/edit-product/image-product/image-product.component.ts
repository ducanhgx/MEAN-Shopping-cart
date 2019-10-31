import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/sanpham.model';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { FileUploader, FileSelectDirective, FileLikeObject } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.css']
})
export class ImageProductComponent implements OnInit {
  @Input() id: String
  UploadURL: any;
  images: any;
  showloading: Boolean = false;
  constructor(
    private cpService: CategoryProductService,
    private toastr: ToastrService
  ) { }

  public uploader: FileUploader
  public hasBaseDropZoneOver: boolean = false;
  ngOnInit() {
    this.UploadURL = `http://localhost:3000/api/product/upload/${this.id}`;
    this.uploader = new FileUploader({ url: this.UploadURL, itemAlias: 'myimage' });
    this.getDataImages()
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.getDataImages()
      alert('Thêm hình thành công !');
    };
  }
  async  getDataImages() {
    let res = await this.cpService.getDataProductId(this.id).toPromise()
    this.images = res['result']['hinhanhsp']
  }
  deleteImage(id: String, index: Number) {
    this.cpService.removeImageProduct(id, index).subscribe((res: any) => {
      if (res.status) {
        this.getDataImages()
        this.toastr.success('Xóa hình thành công !')
      }
    })

  }

  toggleImageAvatar(id: String) {
    this.showloading = true;
    this.cpService.toggleImageProduct(id).subscribe((res: any) => {
      if (res.status) {
        setTimeout(
          () => {
            this.getDataImages()
            this.showloading = false
            this.toastr.success('Cập nhật thành công !')
          }, 2000)
      }
    })

  }
}
