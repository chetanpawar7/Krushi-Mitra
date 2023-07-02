import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  user_role: string;
  orders = [];
  userId: any;
  user_session_id: string;

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService,    private admin_service: AdminService
    ) { }
  ngOnInit() {
    this.user_session_id = sessionStorage.getItem("user_session_id");
    console.log(this.user_session_id);
    this.getOrder();
  }

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data;
    });
  }

  deleteOrder(user_id) {
    this.admin_service.deleteorder(user_id).subscribe(
      (data) => {
        this.getOrder();
      }
    );
  }

}
