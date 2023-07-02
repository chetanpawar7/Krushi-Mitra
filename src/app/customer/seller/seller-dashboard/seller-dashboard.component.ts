import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomerService } from "../../services/customer.service";

@Component({
  selector: "app-seller-dashboard",
  templateUrl: "./seller-dashboard.component.html",
  styleUrls: ["./seller-dashboard.component.scss"],
})
export class SellerDashboardComponent implements OnInit {
  order_dashboard_data;
  total_order;
  last_order_date;
  name;
  product_dashboard_data;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;
  user_session_id:any;
  loggedinname='';
  addEditProductForm

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loggedinname = sessionStorage.getItem("name");
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required]
    })
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
    this.name = sessionStorage.getItem("name");
  }

  get rf() { return this.addEditProductForm.controls; }

  sellerProductDashboard() {
    this.router.navigateByUrl("/farmer/product");
  }
  sellerOrderDashboard() {
    alert("WIP");
  }
  sellerOrderDashboardData() {
    this.customerService.orderDashboardData().subscribe(
      (data) => {
        this.order_dashboard_data = data;
        this.total_order = Number(this.order_dashboard_data.length);
        this.last_order_date =
          this.order_dashboard_data[this.total_order - 1].dateTime;
        // console.log("product_dashboard_data", this.order_dashboard_data);
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }

  sellerProductDashboardData() {
    this.customerService.productDashboardData().subscribe(
      (data) => {
        this.product_dashboard_data = data;
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
        // console.log(this.publish_product);

        // console.log("product_dashboard_data", this.product_dashboard_data[this.product_dashboard_data.length - 1]);
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }
}
