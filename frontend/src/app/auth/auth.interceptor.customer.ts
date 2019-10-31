import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { KhachhangService } from './../services/khachhang.service';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AuthInterceptorcustomer implements HttpInterceptor {

    constructor(private adminService: AdminService, private khachhangService: KhachhangService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('noauth')) {
            return next.handle(req.clone());
        }

        else {
            if (this.khachhangService.getToken()) {
                const clonedreq = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + this.khachhangService.getToken())
                });
                return next.handle(clonedreq).pipe(
                    tap(
                        event => { },
                        err => {
                            console.log(!err.error.auth)
                            if (!err.error.auth) {
                                this.khachhangService.deleteToken();
                                this.router.navigateByUrl('/dangnhap');
                            }
                        })
                );
            } else {
                if (this.adminService.getToken()) {
                    const clonedreq = req.clone({
                        headers: req.headers.set("Authorization", "Bearer " + this.adminService.getToken())
                    });
                    return next.handle(clonedreq).pipe(
                        tap(
                            event => { },
                            err => {
                                if (!err.error.auth) {
                                    this.adminService.deleteToken()
                                    this.router.navigateByUrl('/quantri/dangnhap');
                                    location.reload(true);
                                }
                            })
                    );
                }

            }


        }
        return next.handle(req).pipe(catchError(err => {
            // console.log(err)
            if (err.status === 401) {
                this.khachhangService.onLogout()
                this.adminService.onLogout()
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}


