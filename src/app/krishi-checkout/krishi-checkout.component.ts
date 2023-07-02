import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, User, Order } from '../core/models/object-model';
import { CustomerService } from '../customer/services/customer.service';
declare var Razorpay: any;
import { HostListener } from "@angular/core";


@Component({
  selector: 'app-krishi-checkout',
  templateUrl: './krishi-checkout.component.html',
  styleUrls: ['./krishi-checkout.component.scss']
})
export class KrishiCheckoutComponent implements OnInit {
  single_product_id: number;
  user_id: number;
  individual_product: Product;
  user_detail: User;
  user_address;
  user_contact_no: Number;
  order_dto: Order;
  id: number;
  status = "Ordered";
  is_negotiation: boolean;
  negotiation_price: number;
  isshopowner: boolean=true;
  negotiation_quantity: number;
  loggedinname: string;
  approvedby: string;

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
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.currentProduct.subscribe(
      (product) => (this.single_product_id = product)
    );
    this.user_id = Number(sessionStorage.getItem("user_session_id"));
    this.loggedinname = sessionStorage.getItem("name");
    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id);
  }

  productDetail(single_product_id) {
    this.customerService.individualProduct(single_product_id).subscribe(
      (data) => {
        this.individual_product = data;
        // console.log("One Product", this.individual_product);
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


  paynow() {
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

  placeOrder() {
    this.order_dto = {
      orderid: this.id,
      userId: this.user_id,
      requestedby: this.loggedinname,
      approvedby: this.approvedby,      // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
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
        city: this.individual_product.city
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
      is_negotiation: this.is_negotiation,
      negotiation_price: this.negotiation_price,
      negotiation_quantity: this.negotiation_quantity,
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    // console.log("Place order dto", this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe((data) => {
      // console.log("Order placed successfully", data);
      // alert("Order places successfully");
      // this.router.navigateByUrl("/merchant/merchant-orders");
      // this.router.navigateByUrl("/farmer/krishi");
      this.router.navigateByUrl("/farmer/seeds-pesticides");
    });
  }

}
