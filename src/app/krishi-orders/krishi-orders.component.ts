import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-krishi-orders',
  templateUrl: './krishi-orders.component.html',
  styleUrls: ['./krishi-orders.component.scss']
})
export class KrishiOrdersComponent implements OnInit {

  user_role: string;
  orders = [];
  userId: any;
  user_session_id: string;
  isshopowner;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService
  ) {}

  ngOnInit() {
    this.user_session_id = sessionStorage.getItem("user_session_id");
    console.log(this.user_session_id);
    this.getOrder();
  }

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data.filter(
        // (order) => order.userId == this.user_session_id
        (order) => order.userId == this.user_session_id && order.product.isshopowner === true,
        console.log( this.user_session_id)
      );
    });
  }
  
  // getShoppingOrder() {
  //   this.product_service.getAllorders().subscribe((data) => {
  //     this.orders = data.filter(
  //       (order) => order.userId == this.user_session_id
  //     );
  //   });
  // }
}
