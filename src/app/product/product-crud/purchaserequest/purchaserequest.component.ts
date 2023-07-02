import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "src/app/customer/services/customer.service";
import { ProductService } from "src/app/shared/services/product.service";
import {
  Product,
  User,
  Order,
  Address,
} from "../../../core/models/object-model";
declare var jQuery: any;

@Component({
  selector: "app-purchaserequest",
  templateUrl: "./purchaserequest.component.html",
  styleUrls: ["./purchaserequest.component.scss"],
})
export class PurchaserequestComponent implements OnInit {
  addEditProductForm1: FormGroup;
  orders;
  popup_header: string;

  order_data;
  order_dto: Order;

  single_product_data;
  edit_id;
  user_session_id: any;
  name: any;
  loggedinname = "";
  user_role = "";
  singleOrder;
  id: any;
  // addEditorderForm1: any;
  individual_product: Product;
  user_address: any;
  is_negotiation: boolean;
  negotiation_price: number;
  user_contact_no: Number;
  edit_order_id: any;
  current_order_id: any;
  status: any;
  isshopowner: boolean;
  orderId: any;
  editing: any;
  edit: boolean = false;

  mobNumber = "";
  city = "";
  user_id: number;
  approvedby: string;
  requestedby: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private product_service: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.user_role = sessionStorage.getItem("role");
    this.loggedinname = sessionStorage.getItem("name");
    console.log(this.loggedinname);
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.user_id = Number(sessionStorage.getItem("user_session_id"));
    console.log(this.user_session_id);

    this.addEditProductForm1 = this.formBuilder.group({
      user_id: [""],
      orderid: [""],
      name: [""],
      uploadPhoto: [""],
      productDesc: [""],
      mrp: [""],
      dp: [""],
      addedBy: [""],
      contact: [""],
      status: [""],
      dateTime: [""],
      addLine1: [""],
      addLine2: [""],
      id: [""],
      status1: [""],
      city: [""],
      state: [""],
      zipCode: [""],
      negotiation_price: [""],
      negotiation_quantity: [""],
      user_session_id: [""],
      role: [""],
      mobNumber: [""],
      requestedby: [""],
      // city : this.singleOrder.product.city || "",
    });

    this.getOrdersFarmer();
    // this.getOrdersMerchant();
    // this.getmyProduct();
  }
  get rf() {
    return this.addEditProductForm1.controls;
  }
  getOrdersFarmer() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data.filter(
        // (order) => order.userId && order.product.role === 'farmer',
        // (order) => order.product.role === "farmer",
        (order) => order.product.user_session_id === this.user_session_id
      );
      // this.orders = data.filter(
      //   (order) => order.user_Id == this.user_session_id
      // );
    });
  }

  getOrdersMerchant() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data;
      // this.orders = data.filter(
      //   (order) => order.product.user_session_id == this.user_session_id
      // );
      console.log(data);
    });
  }

  editProductPopup(id) {
    // this.current_order_id = Order.id;
    // this.user_contact_no = order.contact;
    // this.status = order.status;
    this.edit = true;
    this.popup_header = "Update Order Status : " + id;
    this.addEditProductForm1.reset();
    this.customerService.singleOrder(id).subscribe((data) => {
      this.singleOrder = data;
      this.edit_order_id = data.id;
      console.log("single order", this.singleOrder);
      this.addEditProductForm1.setValue({
        requestedby: this.singleOrder.requestedby || "",
        user_id: this.singleOrder.userId || "",
        orderid: this.singleOrder.id || "",
        id: this.singleOrder.product.id || "",
        name: this.singleOrder.product.name || "",
        uploadPhoto: this.singleOrder.product.uploadPhoto || "",
        productDesc: this.singleOrder.product.productDesc || "",
        mrp: this.singleOrder.product.mrp || "",
        dp: this.singleOrder.product.dp || "",
        addedBy: this.singleOrder.product.addedBy || "",
        user_session_id: this.singleOrder.product.user_session_id || "",
        role: this.singleOrder.product.role || "",
        mobNumber: this.singleOrder.product.mobNumber || "",
        // city : this.singleOrder.product.city || "",
        status1: this.singleOrder.product.status || "",

        addLine1: this.singleOrder.deliveryAddress.addLine1 || "",
        addLine2: this.singleOrder.deliveryAddress.addLine2 || "",
        city: this.singleOrder.deliveryAddress.city || "",
        state: this.singleOrder.deliveryAddress.state || "",
        zipCode: this.singleOrder.deliveryAddress.zipCode || "",
        status: this.singleOrder.status || "",
        contact: this.singleOrder.mobNumber || "",
        dateTime: this.singleOrder.dateTime || "",
        negotiation_price: this.singleOrder.negotiation_price || "",
        negotiation_quantity: this.singleOrder.negotiation_quantity || "",
      });
    });
  }

  updateProduct(): void {
    if (this.addEditProductForm1.valid) {
      this.order_data = this.addEditProductForm1.value;
      this.order_dto = {
        // const updatedOrder = {
        requestedby: this.order_data.requestedby,
        approvedby: this.loggedinname,
        orderid: this.order_data.id,
        userId: this.order_data.user_id,
        product: {
          // id: this.individual_product.id,
          id: this.order_data.id,
          name: this.order_data.name,
          uploadPhoto: this.order_data.uploadPhoto,
          productDesc: this.order_data.productDesc,
          mrp: this.order_data.mrp,
          dp: this.order_data.dp,
          status: this.order_data.status,
          addedBy: this.order_data.addedBy,
          user_session_id: this.order_data.user_session_id,
          isshopowner: this.isshopowner,
          role: this.order_data.role,
          mobNumber: this.order_data.mobNumber,
          city: this.order_data.city,
        },
        deliveryAddress: {
          id: 0,
          addLine1: this.order_data.addLine1,
          addLine2: this.order_data.addLine2,
          city: this.order_data.city,
          state: this.order_data.state,
          zipCode: Number(this.order_data.zipCode),
        },
        is_negotiation: this.order_data.is_negotiation,
        negotiation_price: this.order_data.negotiation_price,
        negotiation_quantity: this.order_data.negotiation_quantity,
        contact: this.order_data.user_contact_no,
        dateTime: this.order_data.dateTime,
        status: this.order_data.status,
      };
      this.customerService
        .updateorder(this.edit_order_id, this.order_dto)
        .subscribe((data) => {
          console.log(data);

          jQuery("#addEditProductModal").modal("toggle");
          alert("Order edited successfully");
          this.router.navigateByUrl("/farmer/orders");
        });
    }
  }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.customerService.deleteorder(id).subscribe(
        (data) => {
          console.log("deleted successfully", data);
          this.getOrdersFarmer();
        },
        (err) => {
          alert("Some Error Occured");
        }
      );
    } else {
      alert("You pressed Cancel!");
    }
  }
}
