import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { KhachhangService } from './../services/khachhang.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardcustomer implements CanActivate {
  constructor(private khachhangService: KhachhangService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.khachhangService.isLoggedIn()) {
      this.khachhangService.deleteToken();
      this.router.navigateByUrl('/dangnhap');
      return false;
    }
    return true;
  }
}
