import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundErrorComponent } from './shared/layouts/page-not-found-error/page-not-found-error.component';
import { AdminAuthGuardLogin, AdminAuthGaurdService, SellerBuyerAuthGuardLogin, SellerAuthGaurdService, BuyerAuthGaurdService, ShopownerGaurdService } from './shared/services/auth-gaurd.service';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { ProductCrudComponent } from './product/product-crud/product-crud.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { AddcropComponent } from './product/product-crud/addcrop/addcrop.component';
import { PesticidesSeedsComponent } from './product/product-crud/pesticides-seeds/pesticides-seeds.component';
import { CartComponent } from './product/product-crud/cart/cart.component';
import { PurchaserequestComponent } from './product/product-crud/purchaserequest/purchaserequest.component';
import { MerchantSellingComponent } from './merchant-selling/merchant-selling.component';
import { FarmerlistComponent } from './farmerlist/farmerlist.component';
import { MerchantOrdersComponent } from './merchant-orders/merchant-orders.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { ShopownerComponent } from './product/product-crud/shopowner/shopowner.component';
import { ShopOrdersComponent } from './product/product-crud/shop-orders/shop-orders.component';
import { FamercheckoutComponent } from './famercheckout/famercheckout.component';
import { FarmerOrdersComponent } from './farmer-orders/farmer-orders.component';
import { SchemesComponent } from './admin/admin-dashboard/schemes/schemes.component';
import { KrishiOrdersComponent } from './krishi-orders/krishi-orders.component';
import { KrishiCheckoutComponent } from './krishi-checkout/krishi-checkout.component';
import { MerchantCropregComponent } from './merchant-cropreg/merchant-cropreg.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { FarmerPurchasingRequestComponent } from './farmer-purchasing-request/farmer-purchasing-request.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "my-profile", component: UserProfileComponent },
  { path: "contact-us", component:ContactUsComponent},
  { path: "payment-gateway", component:PaymentGatewayComponent},

  //Path/component you want to access before admin login/signin
  {
    path: '', canActivate: [AdminAuthGuardLogin], children: [
      { path: "admin-login", component: AdminLoginComponent },
    ]
  },
  //Path/component you want to access after admin login/signin
  {
    path: '', canActivate: [AdminAuthGaurdService], children: [
      { path: "admin-dashboard", component: AdminDashboardComponent },
      { path: "my-profile", component: UserProfileComponent },
      { path: "admin/user", component: UserCrudComponent },
      { path: "admin/product", component: ProductCrudComponent },
      { path: "admin/govSchemes", component: SchemesComponent },
      { path: "admin/orders", component: OrdersComponent },
      { path: "admin/feedbacks", component: FeedbacksComponent },
    ]
  },

  //Path/component you want to access before customer(farmer and merchant) login/signin
  {
    path: '', canActivate: [SellerBuyerAuthGuardLogin], children: [
      { path: "sign-in", component: SigninSignupComponent },
      { path: "sign-up", component: SigninSignupComponent },
    ]
  },

  //Path/component you want to access after customer(farmer) login/signin
  {
    path: '', canActivate: [SellerAuthGaurdService], children: [
      { path: "farmer-dashboard", component: AddcropComponent },
      { path: "farmer/product", component: ProductCrudComponent },
      { path: "farmer/addcrop", component: AddcropComponent },
      { path: "farmer/seeds-pesticides", component: PesticidesSeedsComponent },
      { path: "farmer/cart", component: CartComponent },
      { path: "farmer/merchant-selling", component: MerchantSellingComponent },
      { path: "farmer/purchaserequestf", component: PurchaserequestComponent },
      { path: "farmer/order/:id", component: OrderViewComponent },
      { path: "farmer/checkout", component: FamercheckoutComponent },
      { path: "farmer/orders", component: FarmerOrdersComponent },
      { path: "farmer/krishi", component: KrishiOrdersComponent },
      { path: "farmer/krishi-checkout", component: KrishiCheckoutComponent },
      { path: "farmer/govSchemes", component: SchemesComponent },

      // { path: "my-profile", component: UserProfileComponent },
    ]
  },

  {
    path: '', canActivate: [ShopownerGaurdService], children: [
      { path: "shopowner", component: ShopownerComponent },
      { path: "shopowner/orders", component: ShopOrdersComponent },
      { path: "shopowner/orders/:id", component: OrderViewComponent },
      // { path: "my-profile", component: UserProfileComponent },
    ]
  },

  //Path/component you want to access after customer(merchant) login/signin
  {
    path: '', canActivate: [BuyerAuthGaurdService], children: [
      { path: "merchant/addcrop", component: MerchantCropregComponent },
      { path: "merchant/product", component: ProductCrudComponent },
      { path: "merchant/purchaserequestm", component: FarmerPurchasingRequestComponent },
      { path: "merchant-dashboard", component: BuyerDashboardComponent },
      { path: "merchant/checkout", component: CheckoutComponent },
      { path: "merchant/farmer-list", component: FarmerlistComponent },
      { path: "merchant/merchant-orders", component: MerchantOrdersComponent },
      { path: "merchant/govSchemes", component: SchemesComponent },
      // { path: "my-profile", component: UserProfileComponent }
    ]
  },
  { path: "**", component: PageNotFoundErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
