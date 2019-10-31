import { Component, ViewChild, OnInit, Inject } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatSlideToggleChange } from "@angular/material";
import { CategoryProductService } from "./../../../services/category-product.service";
import { OrderService } from './../../../services/order.service'
import { Category } from "./../../../models/danhmuc.model";
import { MatDialog } from '@angular/material'
import { AdminService } from './../../../services/admin.service';
import { ViewOrderComponent } from './view-order/view-order.component'
import { DeleteDialogComponent } from './../shared/delete-dialog/delete-dialog.component'
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from './../shared/confirm-dialog/confirm-dialog.component'
@Component({
  selector: 'app-management-orders-admin',
  templateUrl: './management-orders-admin.component.html',
  styleUrls: ['./management-orders-admin.component.css']
})
export class ManagementOrdersAdminComponent implements OnInit {

  messenger: String = ''
  panelOpenState = false;
  ELEMENT_DATA: any;
  title = "material-demo";
  displayedColumns: string[] = [
    // "_id",
    "name",
    "phone",
    "email",
    // "address",
    "status",
    // "totalprice",
    "order",
    "createdAt",
    "updatedAt",
    "action"
  ];
  dataSource: any = new MatTableDataSource(this.ELEMENT_DATA);
  constructor(
    private cpService: CategoryProductService,
    private orderService: OrderService,
    private adminService: AdminService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async ngOnInit() {
    this.getData()
  }
  async getData() {
    const res = await this.orderService.getDataOrders().toPromise()
    this.ELEMENT_DATA = res["result"]
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  logData(row) {
    console.log(row);
  }
  editData(row) {
    console.log(row);
  }
  deleteData(row) {
    const status = row.status ? '' : 'Hóa đơn này chưa thanh toán !. '
    const messenger = `${status}Bạn có chắc muốn xóa hóa đơn này ? `
    const title = `Xóa hóa đơn`
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { title: title, messenger: messenger }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteOrder(row._id).subscribe(res => {
          console.log(res)
          this.getData();
        })
      }
    });
  }
  applyFilter(filterString: string) {
    this.dataSource.filter = filterString.trim().toLowerCase();
  }

  onOpenAdd() {

  }
  onOpenEdit(row) {
    console.log(row)
    const dialogRef = this.dialog.open(ViewOrderComponent, {
      width: '1200px',
      data: { Order: row }
    });
  }
  onChange(id: string, toggle: MatSlideToggleChange) {
    //  console.log(toggle.source)

  }
  onStatusOrder(row) {
   const id = row._id
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '1000px',
      data: { customer: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'string' && result === 'false') {
        this.getData();
      }
      else {
        const status = { status: result }
        this.orderService.putStatusOrder(row._id, status).subscribe(res => {
          this.getData();
          // this.orderService.putQtyProduct(id,status).subscribe(res => console.log(res))
          this.toastr.success('Cập nhật thành công !')
        })
      }
    })
  }
}
