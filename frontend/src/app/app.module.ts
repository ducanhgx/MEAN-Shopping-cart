import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { CKEditorModule } from 'ng2-ckeditor';
import { FileUploadModule } from 'ng2-file-upload';
import { CKEditorModule } from 'ngx-ckeditor';
import { ToastrModule } from 'ngx-toastr'

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { SignupComponent } from "./components/user/sign-up/sign-up.component";
import { SigninComponent } from "./components/user/sign-in/sign-in.component";

import { AuthGuardcustomer } from "./auth/auth.guard.customer";
import { AuthGuardadmin } from "./auth/auth.guard.admin";
import { AuthInterceptorcustomer } from "./auth/auth.interceptor.customer";

import { AdminService } from "./services/admin.service";
import { KhachhangService } from "./services/khachhang.service";
import { CategoryProductService } from "./services/category-product.service";
import { HomeShopComponent } from "./components/shop/home-shop/home-shop.component";
import { ProductShopComponent } from "./components/shop/product-shop/product-shop.component";
import { ShopComponent } from "./components/shop/shop.component";
import { SignUpShopComponent } from "./components/shop/sign-up-shop/sign-up-shop.component";
import { SignInShopComponent } from "./components/shop/sign-in-shop/sign-in-shop.component";
import { ProfileCustomerShopComponent } from "./components/shop/profile-customer-shop/profile-customer-shop.component";
import { CartShopComponent } from "./components/shop/cart-shop/cart-shop.component";
import { CheckProductsShopComponent } from "./components/shop/check-products-shop/check-products-shop.component";
import { SignInAdminComponent } from "./components/admin/sign-in-admin/sign-in-admin.component";
import { AdminComponent } from "././components/admin/admin.component";
import { HomeAdminComponent } from "./components/admin/home-admin/home-admin.component";
import { ManagementProductsAdminComponent } from "./components/admin/management-products-admin/management-products-admin.component";
import { ManagementCategorysAdminComponent } from "./components/admin/management-categorys-admin/management-categorys-admin.component";
import { ManagementCustomersAdminComponent } from "./components/admin/management-customers-admin/management-customers-admin.component";
import { AddEditCategoryComponent } from "./components/admin/management-categorys-admin/add-edit-category/add-edit-category.component";
import { EditProductComponent } from './components/admin/management-products-admin/edit-product/edit-product.component';
import { InformationProductComponent } from './components/admin/management-products-admin/edit-product/information-product/information-product.component';
import { ImageProductComponent } from './components/admin/management-products-admin/edit-product/image-product/image-product.component';
import { AddProductComponent } from './components/admin/management-products-admin/add-product/add-product.component';
import { CartCustomerShopComponent } from './components/shop/cart-customer-shop/cart-customer-shop.component';
import { DetailProductShopComponent } from './components/shop/detail-product-shop/detail-product-shop.component';
import { ManagementOrdersAdminComponent } from './components/admin/management-orders-admin/management-orders-admin.component';
import { ViewOrderComponent } from './components/admin/management-orders-admin/view-order/view-order.component';
import { DeleteDialogComponent } from './components/admin/shared/delete-dialog/delete-dialog.component';
import { ViewCustomerComponent } from './components/admin/management-customers-admin/view-customer/view-customer.component';
import { FooterShopComponent } from './components/shop/footer-shop/footer-shop.component';
import { HeaderShopComponent } from './components/shop/header-shop/header-shop.component';
import { IntroduceShopComponent } from './components/shop/introduce-shop/introduce-shop.component';
import { ContactShopComponent } from './components/shop/contact-shop/contact-shop.component';
import { ConfirmDialogComponent } from './components/admin/shared/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserProfileComponent,
    SignupComponent,
    SigninComponent,
    HomeShopComponent,
    ProductShopComponent,
    ShopComponent,
    SignUpShopComponent,
    SignInShopComponent,
    ProfileCustomerShopComponent,
    CartShopComponent,
    CheckProductsShopComponent,
    SignInAdminComponent,
    AdminComponent,
    HomeAdminComponent,
    ManagementProductsAdminComponent,
    ManagementCategorysAdminComponent,
    ManagementCustomersAdminComponent,
    AddEditCategoryComponent,
    EditProductComponent,
    InformationProductComponent,
    ImageProductComponent,
    AddProductComponent,
    CartCustomerShopComponent,
    DetailProductShopComponent,
    ManagementOrdersAdminComponent,
    ViewOrderComponent,
    DeleteDialogComponent,
    ViewCustomerComponent,
    FooterShopComponent,
    HeaderShopComponent,
    IntroduceShopComponent,
    ContactShopComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true
      }
    )
  ],
  entryComponents: [ConfirmDialogComponent,ViewCustomerComponent, DeleteDialogComponent, AddEditCategoryComponent, AddProductComponent, ViewOrderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorcustomer,
      multi: true
    },
    AuthGuardcustomer,
    AuthGuardadmin,
    KhachhangService,
    AdminService,
    KhachhangService,
    CategoryProductService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
