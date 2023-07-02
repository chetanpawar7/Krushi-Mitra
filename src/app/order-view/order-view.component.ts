import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, Product, User } from '../core/models/object-model';
import { CustomerService } from '../customer/services/customer.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  
  id: any;
  Order: Order;
  form: any;
  
  user_session_id;
  single_product_id: number;
  user_id: number;
  individual_product: Product;
  user_detail: User;
  user_address;
  user_contact_no: Number;
  order_dto: Order;
  status = "";
  is_negotiation: boolean;
  negotiation_price: number;
  addEditProductForm: any;
  addEditorderForm: any;
  order_data: any;
  single_order_data: any;
  edit_order_id: any;
  EditorderForm: FormGroup;
  orders: any = [];
  editorder;
  all_order_data: any;
  name: string;
  loggedinname: string;
  all_product_data;
  my_product_data;
  addEditProduct: boolean = false; //for form validation
  popup_header: string;
  add_product: boolean;
  edit_product: boolean;
  product_data;
  product_dto: Product;
  single_product_data;
  edit_product_id;
  user_role = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private product_service: ProductService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.find(this.id).subscribe((data: Order)=>{
      this.Order = data;
    });


    this.form = new FormGroup({
      status: new FormControl('', Validators.required)
    });
  }


  // ngOnInit() {
  //   this.user_session_id = sessionStorage.getItem("user_session_id");
  //   this.getOrder();
  //   this.EditorderForm = this.formBuilder.group({
  //     status: ["", Validators.required],
  //   });
  //   // this.user_role = sessionStorage.getItem("role");
  //   this.loggedinname = sessionStorage.getItem("name");
  //   this.user_session_id = sessionStorage.getItem("user_session_id");
  //   this.addEditProductForm = this.formBuilder.group({
  //     name: ["", Validators.required],
  //     uploadPhoto: ["", Validators.required],
  //     productDesc: ["", Validators.required],
  //     mrp: ["", Validators.required],
  //     dp: ["", Validators.required],
  //     status: ["", Validators.required],
  //   });
  // }

  get rf() {
    return this.addEditProductForm.controls;
  }
  

  // editProductPopup(id) {
  //   this.addEditProductForm.reset();
  //   this.product_service.singleProduct(id).subscribe((data) => {
  //     this.single_product_data = data;
  //     this.edit_product_id = data.id;
  //     // console.log("single_product_data", this.single_product_data)
  //     this.addEditProductForm.setValue({
  //       name: this.single_product_data.name,
  //       // uploadPhoto: '',
  //       uploadPhoto: this.single_product_data.uploadPhoto,
  //       productDesc: this.single_product_data.productDesc,
  //       mrp: this.single_product_data.mrp,
  //       dp: this.single_product_data.dp,
  //       status: this.single_product_data.status,
  //     });
  //   });
  // }

  // updateProduct() {
  //   this.addEditProduct = true;
  //   if (this.addEditProductForm.invalid) {
  //     // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
  //     return;
  //   }
  //   this.product_data = this.addEditProductForm.value;
  //   this.product_dto = {
  //     id: 0,
  //     name: this.product_data.name,
  //     uploadPhoto: this.product_data.uploadPhoto,
  //     productDesc: this.product_data.productDesc,
  //     mrp: this.product_data.mrp,
  //     dp: this.product_data.dp,
  //     status: this.product_data.status,
  //     addedBy: this.loggedinname,
  //     user_session_id: this.user_session_id,
  //   };
  //   this.product_service
  //     .updateProduct(this.edit_product_id, this.product_dto)
  //     .subscribe(
  //       (data) => {
  //         // console.log(data);
  //        console.log("inside update");
          
  //       }
        
  //     );
  // }


  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      // this.orders =data;
      this.orders = data.filter((order) => {
        return order.product.user_session_id == this.user_session_id;
      });
    });
  }

  Search() {
    if (this.name == "") {
      this.ngOnInit();
    } else {
      this.orders.name = this.orders.name.filter(
        (res: { name: string }) => {
          return res.name
            .toLocaleLowerCase()
            .match(this.name.toLocaleLowerCase());
        }
      );
    }
  }

  key: string = "id";
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  edit(id) {
    this.customerService.single_order_data(id).subscribe((data) => {
      this.single_order_data = data;
      this.edit_order_id = data.id;
      // console.log("single_product_data", this.single_product_data)
      this.EditorderForm.setValue({
        status: this.single_order_data.status
      });
    });
  }

  // accept() {
  //   console.log(this.order_data);
  //   this.order_data = this.addEditorderForm.value;
  //   this.order_dto = {
  //     id: this.id,
  //     userId: this.user_id,
  //     status: "accept",
  //     // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
  //     product: {
  //       id: this.individual_product.id,
  //       name: this.individual_product.name,
  //       uploadPhoto: this.individual_product.uploadPhoto,
  //       productDesc: this.individual_product.productDesc,
  //       mrp: this.individual_product.mrp,
  //       dp: this.individual_product.dp,
  //       status: this.individual_product.status,
  //       addedBy: this.individual_product.addedBy,
  //       user_session_id: this.individual_product.user_session_id,
  //     },
  //     deliveryAddress: {
  //       id: 0,
  //       addLine1: this.user_address.addLine1,
  //       addLine2: this.user_address.addLine2,
  //       city: this.user_address.city,
  //       state: this.user_address.state,
  //       zipCode: Number(this.user_address.zipCode),
  //     },
  //     is_negotiation: this.is_negotiation,
  //     negotiation_price: this.negotiation_price,
  //     contact: this.user_contact_no,
  //     dateTime: new Date().toLocaleDateString(),
  //   };
  //   // console.log("Place order dto", this.order_dto);
  //   this.customerService.updateOrder(this.edit_order_id,this.order_dto).subscribe((data) => {
  //     // console.log("Order placed successfully", data);
  //     alert("Order edited successfully");
  //     // this.router.navigateByUrl("/merchant/merchant-orders");
  //     this.router.navigateByUrl("/farmer/purchaserequest");
  //   });
  // }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.customerService.deleteorder(id).subscribe(
        (data) => {
          console.log("deleted successfully", data);
          this.getOrder();
        }
      );
    } else {
      alert("You pressed Cancel!");
    }
  }

  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.customerService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Transaction updated successfully!');
         this.router.navigateByUrl('orders/');
    })
  }
}
