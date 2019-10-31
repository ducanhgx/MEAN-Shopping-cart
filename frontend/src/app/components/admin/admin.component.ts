import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Order } from './../../models/order.model';
import { OrderService } from './../../services/order.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  numberOrder: Number = 0
  opened = true;
  profileAdmin : any = {}
  constructor(private adminService: AdminService,
    private orderService: OrderService
  ) {
      setInterval(() => {
      this.getNumberOrder()
    }, 500)
  }

  ngOnInit() {
  this.getNumberOrder()
  this.getDataAdmin()

  }
  getDataAdmin(){
    if(this.adminService.getToken()){
      console.log('vô')
        this.adminService.getAdminProfile().subscribe(res => {
          this.profileAdmin = res['result']
      })
    }
  }
  async getNumberOrder() {
   if(this.adminService.getToken()){
    const res = await this.orderService.getDataOrders().toPromise()
    this.numberOrder = res['result'].filter(e => !e.status).length
   }
  }
  onLogOut() {
    this.adminService.onLogout();
  }

}
