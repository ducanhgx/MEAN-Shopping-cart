import { Component, ViewChild, OnInit, Inject } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatSlideToggleChange } from "@angular/material";
import { CategoryProductService } from "./../../../services/category-product.service";
import { AdminService } from "./../../../services/admin.service";
import { Category } from "./../../../models/danhmuc.model";
import { MatDialog } from '@angular/material'
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component'
import { DeleteDialogComponent } from './../shared/delete-dialog/delete-dialog.component'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-management-categorys-admin",
  templateUrl: "./management-categorys-admin.component.html",
  styleUrls: ["./management-categorys-admin.component.css"]
})
export class ManagementCategorysAdminComponent implements OnInit {
  category: Category = {
    tendm: '',
    motadm: '',
  }
  panelOpenState = false;
  ELEMENT_DATA: any;
  title = "material-demo";
  displayedColumns: string[] = [
    // "_id",
    "tendm",
    "motadm",
    "trangthaidm",
    "createdAt",
    "updatedAt",
    "action"
  ];
  dataSource: any = new MatTableDataSource(this.ELEMENT_DATA);
  constructor(
    private cpService: CategoryProductService,
    private adminService: AdminService,
    public dialog: MatDialog,
    private toastr : ToastrService
  ) {
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async ngOnInit() {
    let res = await this.cpService.getDataCategories().toPromise();
    this.ELEMENT_DATA = res["result"]
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async getData() {
    let res = await this.cpService.getDataCategories().toPromise();
    this.ELEMENT_DATA = res["result"]
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  logData(row) {
    console.log(row);
  }
  editData(row) {
    console.log(row);
  }
  async deleteData(row) {
    const messenger = `Bạn có chắc muốn xóa danh mục này ?
     Điều này đồng nghĩa với việc xóa các sản phẩm liên quan !`
    const title = `Xóa danh mục`
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { title: title, messenger: messenger }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cpService.deleteCategory(row._id).subscribe(_ => {
          this.toastr.success('Xóa thành công !')
          this.getData()
        })  
      }
    })
  }
  applyFilter(filterString: string) {
    this.dataSource.filter = filterString.trim().toLowerCase();
  }

  onOpenAdd() {
    console.log(this.category.tendm !== '' && this.category.motadm !== '')
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      data: { category: this.category }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        if (result.tendm.trim() !== '' && result.motadm.trim() !== '') {
          this.cpService.postCategory(this.category).subscribe(res => {
            this.getData()
            this.toastr.success('Thêm thành công !')
            this.category = {
              tendm: '',
              motadm: '',
            }
          })
        }
      }

    });
  }
  onOpenEdit(row) {
    this.category = row;
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      data: { category: this.category }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.tendm.trim() !== '' && result.motadm.trim() !== '')
          this.cpService.putCateProduct(this.category).subscribe(res => {
            this.getData()
            this.toastr.success('Cập nhật thành công !')
            this.category = {
              tendm: '',
              motadm: '',
            }
          })
      }
      else{
        this.category = {
          tendm: '',
          motadm: '',
        }
      }
    });
  }
  onChange(id: string, toggle: MatSlideToggleChange) {
    //  console.log(toggle.source)
    this.cpService.toggleCategory(id).subscribe(res => {
      this.getData()
    })
  }
}
