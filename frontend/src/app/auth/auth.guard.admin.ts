import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from "@angular/router";
import { AdminService } from './../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardadmin implements CanActivate {
  constructor(private adminService : AdminService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.adminService.isLoggedIn()) {
        this.adminService.deleteToken();
        this.router.navigateByUrl('/quantri/dangnhap');
        localStorage.clear()
        return false;
      }
    return true;
  }
}
