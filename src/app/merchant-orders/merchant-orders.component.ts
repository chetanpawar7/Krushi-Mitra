import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../shared/services/product.service";
import { HostListener } from "@angular/core";
import { Order, Product } from "../core/models/object-model";
import { CustomerService } from "../customer/services/customer.service";
declare var Razorpay: any;
declare var jQuery: any;

@Component({
  selector: "app-merchant-orders",
  templateUrl: "./merchant-orders.component.html",
  styleUrls: ["./merchant-orders.component.scss"],
})
export class MerchantOrdersComponent implements OnInit {
  addEditProductForm1: FormGroup;
  orders;
  popup_header: string;

  order_data;
  order_dto: Order;
  price;
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
  status: "Ordered";
  isshopowner: boolean;
  orderId: any;
  editing: any;
  edit: boolean = false;

  mobNumber = "";
  city = "";
  user_id: number;
  approvedby: string;
  requestedby: string;

  message: any = "Not yet stared";
  paymentId = "";
  error = "";
  title = "angular-razorpay-intergration";
  options = {
    key: "rzp_test_eyXlHRAzLZmgqa",
    amount: "200",
    name: "Krushi Mitra",
    description: "Web Development",
    image: "",
    order_id: "",
    handler: function (response: any) {
      var event = new CustomEvent("payment.success", {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    notes: {
      address: "",
    },
    theme: {
      color: "#3399cc",
    },
  };
  orderprice: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.loggedinname = sessionStorage.getItem("name");
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
      approvedby: [""],
      // city : this.singleOrder.product.city || "",
    });
    const dp = this.price;
    console.log(this.loggedinname);
    console.log(this.user_session_id);
    this.getOrder();
  }

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data;
      // this.orderprice = data.filter((order) => order.product.dp);
    });
  }

  updateStatus() {
    this.order_data.status = "Ordered";
  }

  paynow() {
    this.changeStatus(this.id);
    this.paymentId = "";
    this.error = "";
    this.options.amount; //paise
    this.options.prefill.name = "Abcd";
    this.options.prefill.email = "abcd@gmail.com";
    this.options.prefill.contact = "9999999999";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on("payment.failed", function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    });
  }

  @HostListener("window:payment.success", ["$event"])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
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
        approvedby: this.singleOrder.approvedby || "",
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

  changeStatus(id) {
    this.edit = true;
    this.popup_header = "Update Order Status : " + id;
    this.addEditProductForm1.reset();
    this.customerService.singleOrder(id).subscribe((data) => {
      this.singleOrder = data;
      this.edit_order_id = data.id;
      console.log("single order", this.singleOrder);
      this.addEditProductForm1.setValue({
        requestedby: this.singleOrder.requestedby || "",
        approvedby: this.singleOrder.approvedby || "",
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
      if (this.addEditProductForm1.valid) {
        this.order_data = this.addEditProductForm1.value;
        this.order_dto = {
          // const updatedOrder = {
          requestedby: this.order_data.requestedby,
          approvedby: this.order_data.approvedby,
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
          status: "Ordered",
        };
        this.customerService
          .updateorder(this.edit_order_id, this.order_dto)
          .subscribe((data) => {
            console.log(data);

            // jQuery("#addEditProductModal").modal("toggle");
            alert("Order edited successfully");
            this.router.navigateByUrl("/merchant/merchant-orders");
          });
      }
    });
  }
}
