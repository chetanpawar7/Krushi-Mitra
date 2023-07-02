import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/customer/services/customer.service";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-pesticides-seeds",
  templateUrl: "./pesticides-seeds.component.html",
  styleUrls: ["./pesticides-seeds.component.scss"],
})
export class PesticidesSeedsComponent implements OnInit {
  all_products;
  show_checkout: Boolean = false;
  isshopowner: boolean;
  shoporderhistory: boolean;
  user_session_id: any;
  user_role: string;
  loggedinname: string;

  constructor(
    private router: Router,
    public product_service: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {    
    this.user_role = sessionStorage.getItem("role");
    this.loggedinname = sessionStorage.getItem("name");
    this.user_session_id = sessionStorage.getItem("user_session_id");

    this.getAllProduct();
  }

  getAllProduct() {
    this.product_service.allProduct(this.user_session_id).subscribe((data) => {
      // this.all_products = data;
      this.all_products = data.filter(
        (product) => product.role === 'shopowner' && product.status === 'active'
      );
    });
  }

  buyProduct(id) {
    this.show_checkout = true;
    this.isshopowner = true;
    this.customerService.quickBuyProduct(id); //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/farmer/krishi-checkout");
  }

  addToCart(id) {
    this.show_checkout = true;
    this.isshopowner = true;
    this.customerService.quickBuyProduct(id); //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/farmer/cart");
  }

}
