import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-farmer-orders',
  templateUrl: './farmer-orders.component.html',
  styleUrls: ['./farmer-orders.component.scss']
})
export class FarmerOrdersComponent implements OnInit {

  user_role: string;
  orders = [];
  myorders = [];

  userId: any;
  user_session_id: string;
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
    this.getOrder();
    // this.getmyOrder();
  }

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      // this.orders = data;
      this.orders = data.filter(
        (order) =>  order.product.isshopowner !== true,
        console.log( this.user_session_id)
      );
    });
  }

  getmyOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      // this.orders = data;
      this.orders = data.filter(
        (order) => order.product.user_session_id === this.user_session_id,
        console.log( this.user_session_id)
      );
    });
  }
}
