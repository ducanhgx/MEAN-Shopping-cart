import { Component, ViewChild, OnInit, Inject } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatSlideToggleChange } from "@angular/material";
import { CategoryProductService } from "./../../../services/category-product.service";
import { AdminService } from "./../../../services/admin.service";
import { Category } from "./../../../models/danhmuc.model";
import { MatDialog } from '@angular/material'
import { ViewCustomerComponent } from '././view-customer/view-customer.component'
import { DeleteDialogComponent } from './../shared/delete-dialog/delete-dialog.component'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-management-customers-admin',
  templateUrl: './management-customers-admin.component.html',
  styleUrls: ['./management-customers-admin.component.css']
})
export class ManagementCustomersAdminComponent implements OnInit {
  category: Category = {
    tendm: '',
    motadm: '',
  }
  panelOpenState = false;
  ELEMENT_DATA: any;
  title = "material-demo";
  displayedColumns: string[] = [
    // "_id",
    "name",
    "email",
    "address",
    "phone",
    // "order",
    // "totalPrice",
    "createdAt",
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
    let res = await this.adminService.getCustomers().toPromise()
    this.ELEMENT_DATA = res["result"]
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async getData() {
    let res = await this.adminService.getCustomers().toPromise()
    this.ELEMENT_DATA = res["result"]
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  logData(row) {
    console.log(row);
  }
  viewDataCustomer(row) {
    let totalPriceTransactionHistory = 0;
     row.transactionhistory.forEach(e => {
      totalPriceTransactionHistory += e.totalprice
    });
    console.log(totalPriceTransactionHistory)
    const dialogRef = this.dialog.open(ViewCustomerComponent, {
      width: '1200px',
      height: '100%',
      data: { customer: row , totalPriceTransactionHistory : totalPriceTransactionHistory }
    });
  }
  async deleteData(row) {
    const messenger = `Bạn có chắc muốn xóa khách hàng này ?`
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { messenger: messenger }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteCustomer(row._id).subscribe(res => {
          // this.toastr.success( `khách hàng ${row.name} đã xóa !`)
          this.getData()
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
  }
}
