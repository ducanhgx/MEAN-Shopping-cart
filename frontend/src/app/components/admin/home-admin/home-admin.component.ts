import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  opened = true;
  constructor(private adminService : AdminService) { }

  ngOnInit() {
  }
  logout(){
    this.adminService.onLogout();
  }

}
