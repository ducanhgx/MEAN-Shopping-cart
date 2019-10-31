import { Component, ViewChild, OnInit, Inject } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatSlideToggleChange } from "@angular/material";
import { CategoryProductService } from "./../../../services/category-product.service";
import { AdminService } from "./../../../services/admin.service";
import { Category } from "./../../../models/danhmuc.model";
import { MatDialog } from '@angular/material'
import { DeleteDialogComponent } from './../shared/delete-dialog/delete-dialog.component'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-management-products-admin',
  templateUrl: './management-products-admin.component.html',
  styleUrls: ['./management-products-admin.component.css']
})
export class ManagementProductsAdminComponent implements OnInit {

  category: Category = {
    tendm: '',
    motadm: '',
  }
  panelOpenState = false;
  ELEMENT_DATA: any;
  title = "material-demo";
  displayedColumns: string[] = [
    // "_id",
    "tensp",
    "tendm",
    // "giaspchuagiam",
    // "giaspdagiam",
    // "motatomtat",
    // "motachitiet",
    "soluongton",
    "trangthaisp",
    // "hinhanhsp",
    // "createdAt",
    // "updatedAt",
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
    let res = await this.cpService.getDataProducts().toPromise();
    this.ELEMENT_DATA = res["result"]
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async getData() {
    let res = await this.cpService.getDataProducts().toPromise();
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
    const messenger = `Bạn có chắc muốn xóa sản phẩm này ? `
    const title = `Xóa sản phẩm`
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { title: title, messenger: messenger }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cpService.deleteProduct(row._id).subscribe(res => {
          this.getData()
          this.toastr.success('Xóa sản phẩm thành công !')
        })
      }
    })

  }
  applyFilter(filterString: string) {
    this.dataSource.filter = filterString.trim().toLowerCase();
  }

  onOpenAdd() {

  }
  onOpenEdit(row) {

  }
  onChange(id: string, toggle: MatSlideToggleChange) {
    //  console.log(toggle.source)
    this.cpService
      .toggleStatusProduct(id).subscribe(res => {
        this.toastr.success('Cập nhật thành công !')
      })
  }
}
