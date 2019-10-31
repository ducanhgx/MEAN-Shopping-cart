import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/user/sign-up/sign-up.component";
import { UserComponent } from "./components/user/user.component";
import { SigninComponent } from "./components/user/sign-in/sign-in.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { ShopComponent } from "./components/shop/shop.component";
import { HomeShopComponent } from "./components/shop/home-shop/home-shop.component";
import { ProfileCustomerShopComponent } from "./components/shop/profile-customer-shop/profile-customer-shop.component";
import { CheckProductsShopComponent } from "./components/shop/check-products-shop/check-products-shop.component";
import { CartShopComponent } from "./components/shop/cart-shop/cart-shop.component";
import { ProductShopComponent } from "./components/shop/product-shop/product-shop.component";
import { SignUpShopComponent } from "./components/shop/sign-up-shop/sign-up-shop.component";
import { SignInShopComponent } from "./components/shop/sign-in-shop/sign-in-shop.component";
import { AuthGuardcustomer } from "./auth/auth.guard.customer";
import { AdminComponent } from "./components/admin/admin.component";
import { SignInAdminComponent } from "././components/admin/sign-in-admin/sign-in-admin.component";
import { HomeAdminComponent } from "././components/admin/home-admin/home-admin.component";
import { ManagementProductsAdminComponent } from "././components/admin/management-products-admin/management-products-admin.component";
import { ManagementCategorysAdminComponent } from "././components/admin/management-categorys-admin/management-categorys-admin.component";
import { ManagementCustomersAdminComponent } from "././components/admin/management-customers-admin/management-customers-admin.component";
import { EditProductComponent } from '././components/admin/management-products-admin/edit-product/edit-product.component'
import { AuthGuardadmin } from './auth/auth.guard.admin'
import { AddProductComponent } from './components/admin/management-products-admin/add-product/add-product.component'
import { CartCustomerShopComponent } from './components/shop/cart-customer-shop/cart-customer-shop.component'
import { DetailProductShopComponent } from './components/shop/detail-product-shop/detail-product-shop.component'
import { ManagementOrdersAdminComponent } from './components/admin/management-orders-admin/management-orders-admin.component'
import { IntroduceShopComponent } from './components/shop/introduce-shop/introduce-shop.component'
import { ContactShopComponent } from './components/shop/contact-shop/contact-shop.component'

const routes: Routes = [
  {
    path: "",
    redirectTo: "/trangchu",
    pathMatch: "full"
  },
  {
    path: "trangchu",
    component: ShopComponent,
    children: [{ path: "", component: HomeShopComponent }]
  },
  {
    path: "gioithieu",
    component: ShopComponent,
    children: [{ path: "", component: IntroduceShopComponent }]
  },
  {
    path: "lienhe",
    component: ShopComponent,
    children: [{ path: "", component: ContactShopComponent }]
  },
  {
    path: "sanpham",
    component: ShopComponent,
    children: [
      // { path: "", component: ProductShopComponent },
      // { path: ":tendm", component: ProductShopComponent },
      { path: ":id", component: DetailProductShopComponent }
    ]
  },
  {
    path: "thongtinkhachhang",
    component: ShopComponent,
    children: [
      {
        path: "",
        component: ProfileCustomerShopComponent,
        canActivate: [AuthGuardcustomer]
      }
    ]
  },
  {
    path: "checkout",
    component: ShopComponent,
    children: [
      {
        path: "",
        component: CheckProductsShopComponent,
      }
    ]
  },
  {
    path: "giohangkhachhang",
    component: ShopComponent,
    children: [
      {
        path: "",
        component:  CartCustomerShopComponent,
        canActivate: [AuthGuardcustomer]
      }
    ]
  },
  {
    path: "giohang",
    component: ShopComponent,
    children: [
      {
        path: "",
        component: CartShopComponent,
      }
    ]
  },
  {
    path: "dangky",
    component: ShopComponent,
    children: [{ path: "", component: SignUpShopComponent }]
  },
  {
    path: "dangnhap",
    component: ShopComponent,
    children: [{ path: "", component: SignInShopComponent }]
  },
  // {
  //   path: "signup",
  //   component: UserComponent,
  //   children: [{ path: "", component: SignupComponent }]
  // },
  // {
  //   path: "login",
  //   component: UserComponent,
  //   children: [{ path: "", component: SigninComponent }]
  // },
  // {
  //   path: "userprofile",
  //   component: UserProfileComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: "quantri",
    component: AdminComponent,
    children: [{ path: "dangnhap", component: SignInAdminComponent }]
  },
  {
    path: "quantri",
    component: AdminComponent,
    children: [
      { path: "trangchu", component: HomeAdminComponent, canActivate: [AuthGuardadmin] },
    ],

  },
  {
    path: "quantri",
    component: AdminComponent,
    children: [
      { path: "quanlydanhmuc", component: ManagementCategorysAdminComponent, canActivate: [AuthGuardadmin] },
    ],

  },
  {
    path: "quantri",
    component: AdminComponent,
    children: [
      { path: "quanlydonhang", component: ManagementOrdersAdminComponent, canActivate: [AuthGuardadmin] },
    ],

  },
  {
    path: "quantri",
    component: AdminComponent,
    children: [
      { path: "quanlysanpham", component: ManagementProductsAdminComponent, canActivate: [AuthGuardadmin] },
      { path: "quanlysanpham/chinhsua/:id", component: EditProductComponent, canActivate: [AuthGuardadmin] },
      { path: "quanlysanpham/them", component: AddProductComponent, canActivate: [AuthGuardadmin] },
    ],
    canActivate: [AuthGuardadmin]
  },
  {
    path: "quantri",
    component: AdminComponent,
    children: [
      { path: "quanlykhachhang", component: ManagementCustomersAdminComponent, canActivate: [AuthGuardadmin] }
    ],
    canActivate: [AuthGuardadmin]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
