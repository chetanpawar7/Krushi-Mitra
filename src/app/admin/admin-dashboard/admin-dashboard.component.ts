import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/object-model";
import { ProductService } from "src/app/shared/services/product.service";
import { AdminService } from "../services/admin.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  user_dashboard_data;
  total_user: number = 0;
  admin_user: number = 0;
  seller_user: number = 0;
  buyer_user: number = 0;

  user_dto: User;
  all_user_data;
  all_orders;
  product_dashboard_data;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;
  orderTotal: number = 0;
  productTotal: number = 0;
  ordercount;
  usercount;
  productcount;
  orders: any;

  constructor(private router: Router, private adminService: AdminService,
    private product_service: ProductService) {}

  ngOnInit() {
    this.adminUserDashboardData();
    this.adminProductDashboardData();
    this.getAllUser();
    this.getAllproducts();
    this.getAllorders();
    this.getOrder();

  }

  userDashboard() {
    this.router.navigateByUrl("/admin/user");
  }

  productDashboard() {
    this.router.navigateByUrl("/admin/product");
  }

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data;
    });
  }

  adminUserDashboardData() {
    this.adminService.userDashboardData().subscribe(
      (data) => {
        this.user_dashboard_data = data;
        for (let user in this.user_dashboard_data) {
          // console.log(this.user_dashboard_data[status].status);
          if (this.user_dashboard_data[user].role == "admin") {
            ++this.admin_user;
          } else if (this.user_dashboard_data[user].role == "farmer") {
            ++this.seller_user;
          } else if (this.user_dashboard_data[user].role == "merchant") {
            ++this.buyer_user;
          }
          ++this.total_user;
        }
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }

  adminProductDashboardData() {
    this.adminService.productDashboardData().subscribe(
      (data) => {
        this.product_dashboard_data = data;
        console.log(this.product_dashboard_data);

        for (status in this.product_dashboard_data) {
          // console.log(this.product_dashboard_data[status].status);
          if (this.product_dashboard_data[status].status == "publish") {
            ++this.publish_product;
          } else if (this.product_dashboard_data[status].status == "inactive") {
            ++this.inactive_product;
          } else if (this.product_dashboard_data[status].status == "draft") {
            ++this.draft_product;
          }
          ++this.total_product;
        }
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }

  getAllUser() {
    this.adminService.allUser().subscribe((data) => {
      this.all_user_data = data;
      for (var i = 0; i < this.all_user_data.length; i++) {
        // this.total=this.total+parseInt(this.cart[i]['price']);
        // this.total += parseInt(this.all_user_data[i]['price']);
        this.usercount = this.all_user_data.length;
      }
    });
  }

  getAllorders() {
    this.adminService.allOrders().subscribe((data) => {
      this.all_orders = data;
      for (var i = 0; i < this.all_orders.length; i++) {
        this.ordercount = this.all_orders.length;
        // this.orderTotal += parseInt(this.all_orders.product[i]["dp"]);
      }
    });
  }

  getAllproducts() {
    this.adminService.productDashboardData().subscribe((data) => {
      this.product_dashboard_data = data;
      for (var i = 0; i < this.product_dashboard_data.length; i++) {
        this.productTotal += parseInt(this.product_dashboard_data[i]["dp"]);
        this.productcount = this.product_dashboard_data.length;
      }
    });
  }
}
