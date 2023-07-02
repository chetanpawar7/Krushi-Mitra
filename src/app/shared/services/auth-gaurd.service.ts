import { Injectable } from '@angular/core';

import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

//Admin before login check
@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardLogin implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role")
    if (role == "admin") {
      this.router.navigate(["/admin-dashboard"]);
      return false;
    } else {
      return true;
    }
  }
}

//Admin after login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role")
    if (role == 'admin') {
      return true;
    } else {
      this.router.navigate(["/admin-login"]);
      return false;
    }
  }
}

//Customer(merchant & farmer) before login
@Injectable({
  providedIn: "root"
})
export class SellerBuyerAuthGuardLogin implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role")
    if (role == "farmer") {
      this.router.navigate(["/farmer-dashboard"]);
      return false;
    } else if (role == "merchant") {
      this.router.navigate(["/merchant-dashboard"]);
      return false;
    } else {
      return true;
    }
  }
}

//farmer(Customer) after login
@Injectable({
  providedIn: 'root'
})
export class SellerAuthGaurdService {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role");
    if (role == 'farmer') {
      return true;
    } else {
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}

//shopowner(seller) after login
@Injectable({
  providedIn: 'root'
})
export class ShopownerGaurdService {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role");
    if (role == 'shopowner') {
      return true;
    } else {
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}

//merchant(Customer) after login
@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGaurdService {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("role")
    if (role == 'merchant') {
      return true;
    } else {
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}
