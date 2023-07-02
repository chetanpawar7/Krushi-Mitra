import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "../../services/customer.service";
import { Product, User, Order } from "../../../core/models/object-model";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  addEditProductForm1: FormGroup;
  single_product_id: number;
  user_id: number;
  individual_product: Product;
  user_detail: User;
  user_address;
  user_contact_no: Number;
  order_dto: Order;
  id: number;
  status = "Requested";
  is_negotiation: boolean;
  negotiation_price: number;
  isshopowner: boolean;
  user_role: string;
  loggedinname: string;
  user_session_id: string;
  mobNumber: string;
  city: string;
  negotiation_quantity: number;
  edit: boolean;
  popup_header: string;
  singleOrder: any;
  edit_order_id: any;
  approvedby: string;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.user_role = sessionStorage.getItem("role");
    this.loggedinname = sessionStorage.getItem("name");
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.customerService.currentProduct.subscribe(
      (product) => (this.single_product_id = product)
    );
    this.user_id = Number(sessionStorage.getItem("user_session_id"));
    this.addEditProductForm1 = this.formBuilder.group({
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
      city: [""],
      state: [""],
      zipCode: [""],
      negotiation_price: [""],
      negotiation_quantity: [""],
    });

    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id);
  }

  productDetail(single_product_id) {
    this.customerService.individualProduct(single_product_id).subscribe(
      (data) => {
        this.individual_product = data;
        // console.log("One Product", this.individual_product);
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }
  userAddress(user_id) {
    this.customerService.userDetail(user_id).subscribe(
      (data) => {
        // this.user_detail = data.address;
        this.user_address = data.address;
        this.user_contact_no = data.mobNumber;
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }

  placeOrder() {
    this.order_dto = {
      requestedby: this.loggedinname,
      approvedby: '',
      orderid: this.id,
      userId: this.user_id,
      // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDesc: this.individual_product.productDesc,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
        addedBy: this.individual_product.addedBy,
        user_session_id: this.individual_product.user_session_id,
        isshopowner: this.isshopowner,
        role: this.individual_product.role,
        mobNumber: this.individual_product.mobNumber,
        city: this.individual_product.city,
      },
      deliveryAddress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: Number(this.user_address.zipCode),
      },
      status: this.status,
      is_negotiation: false,
      negotiation_price: 0,
      negotiation_quantity: 0,
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    // console.log("Place order dto", this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe((data) => {
      // console.log("Order placed successfully", data);
      // alert("Order places successfully");
      this.router.navigateByUrl("/merchant/merchant-orders");
      // this.router.navigateByUrl("/payment-gateway");
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
        orderid: this.singleOrder.id || "",
        name: this.singleOrder.product.name || "",
        uploadPhoto: this.singleOrder.product.uploadPhoto || "",
        productDesc: this.singleOrder.product.productDesc || "",
        mrp: this.singleOrder.product.mrp || "",
        dp: this.singleOrder.product.dp || "",
        addedBy: this.singleOrder.product.addedBy || "",
        addLine1: this.singleOrder.deliveryAddress.addLine1 || "",
        addLine2: this.singleOrder.deliveryAddress.addLine2 || "",
        city: this.singleOrder.deliveryAddress.city || "",
        state: this.singleOrder.deliveryAddress.state || "",
        zipCode: this.singleOrder.deliveryAddress.zipCode || "",
        status: this.singleOrder.status || "",
        contact: this.singleOrder.contact || "",
        dateTime: this.singleOrder.dateTime || "",
        negotiation_price : this.singleOrder.negotiation_price || "",
        negotiation_quantity : this.singleOrder.negotiation_quantity || ""
      });
    });
  }

  negotiatedOrder() {
    this.order_dto = {
      orderid: this.id,
      requestedby: this.loggedinname,
      approvedby: '',

      userId: this.user_id,
      // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDesc: this.individual_product.productDesc,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
        addedBy: this.individual_product.addedBy,
        user_session_id: this.individual_product.user_session_id,
        isshopowner: this.isshopowner,
        role: this.individual_product.role,
        mobNumber: this.individual_product.mobNumber,
        city: this.individual_product.city,
      },
      deliveryAddress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: Number(this.user_address.zipCode),
      },
      status: this.status,
      is_negotiation: true,
      negotiation_price: this.negotiation_price,
      negotiation_quantity: this.negotiation_quantity,
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    // console.log("Place order dto", this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe((data) => {
      // console.log("Order placed successfully", data);
      alert("requested, payment pending");
      this.router.navigateByUrl("/merchant/merchant-orders");
      // this.router.navigateByUrl("/payment-gateway");
    });
  }
}
