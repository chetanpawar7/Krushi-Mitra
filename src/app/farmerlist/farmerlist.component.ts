import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Order } from "../core/models/object-model";
import { CustomerService } from "../customer/services/customer.service";
import { ProductService } from "../shared/services/product.service";

@Component({
  selector: "app-farmerlist",
  templateUrl: "./farmerlist.component.html",
  styleUrls: ["./farmerlist.component.scss"],
})
export class FarmerlistComponent implements OnInit {
  addEditProductForm: FormGroup;
  edit_product_id;
  product_data;
  add_product: boolean;
  edit_product: boolean;
  popup_header: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService,
    private customerService: CustomerService
  ) {}

  all_products;
  all_farmers = [];
  user_role = "";
  show_checkout: Boolean = false;
  isshopowner:boolean;
  single_product_data;
  addEditProductForm1: FormGroup;


  ngOnInit() {
    // this.getAllFarmers();
    this.addEditProductForm = this.formBuilder.group({
      name: ["", Validators.required],
      uploadPhoto: ["", Validators.required],
      productDesc: ["", Validators.required],
      mrp: ["", Validators.required],
      dp: ["", Validators.required],
      status: ["", Validators.required],
      role: ["", Validators.required],
      mobNumber: ["", Validators.required],
      city: ["", Validators.required]
    });
    this.getAllProduct();
    // this.getAllFarmers();
  }

  // getAllFarmers() {
  //   this.product_service.getAllusers().subscribe((data) => {
  //     this.all_farmers = data.filter((product) => {
  //       console.log(product.role);
  //       return product.role === 'farmer'
  //       this.all_farmers = data;
  //     })
  //   });
  // }

  editProductPopup(id) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.product_service.singleProduct(id).subscribe((data) => {
      this.single_product_data = data;
      this.edit_product_id = data.id;
      // console.log("single_product_data", this.single_product_data)
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status,
        role: this.single_product_data.role,
        mobNumber : this.single_product_data.mobNumber,
        city : this.single_product_data.city
      });
    });
  }


  buyProduct1(id) {
    this.show_checkout = true;
    this.isshopowner = false;
    this.customerService.quickBuyProduct(id) //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/merchant/checkout");
  }

  buyProduct(id) {
    this.show_checkout = true;
    this.isshopowner = false;
    this.customerService.quickBuyProduct(id) //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/merchant/checkout");
  }

  view(id) {
    this.product_service.singleProduct(id).subscribe((data) => {
      this.single_product_data = data;
      this.edit_product_id = data.id;
      // console.log("single_product_data", this.single_product_data)
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status,
        role: this.single_product_data.role,
        mobNumber : this.single_product_data.mobNumber,
        city : this.single_product_data.city,
      });
    });
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe(data => {
      // this.all_products = data;
      // console.log("ALl Product", this.all_products);
      this.all_products = data.filter(
        (product) => product.status === 'active' && product.role === 'farmer'
      );
    })
  }
}
