import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-shop-orders",
  templateUrl: "./shop-orders.component.html",
  styleUrls: ["./shop-orders.component.scss"],
})
export class ShopOrdersComponent implements OnInit {
  user_role: string;
  orders = [];
  userId: any;
  user_session_id: string;
  isshopowner;
  loggedinname: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService
  ) {}

  ngOnInit() {
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.loggedinname = sessionStorage.getItem("name");
    console.log(this.user_session_id);
    this.getOrders();
  }

  getOrders() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data.filter(
        (order) => order.product.isshopowner == true
      );
      // this.orders = data;
      // console.log(data);
    });
  }
}
