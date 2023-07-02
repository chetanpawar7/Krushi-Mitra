import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from "src/app/core/models/object-model";
import { ProductService } from "src/app/shared/services/product.service";
declare var jQuery: any;

@Component({
  selector: "app-addcrop",
  templateUrl: "./addcrop.component.html",
  styleUrls: ["./addcrop.component.scss"],
})
export class AddcropComponent implements OnInit {
  all_product_data;
  my_product_data;
  addEditProductForm: FormGroup;
  addEditProduct: boolean = false; //for form validation
  popup_header: string;
  add_product: boolean;
  edit_product: boolean;

  product_data;
  product_dto: Product;

  single_product_data;
  edit_product_id;
  user_session_id: any;
  name: any;
  loggedinname = "";
  user_role = "";
  addEditUserForm: any;
  isshopowner: boolean;
  mobNumber = "";
  city = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService
  ) {}

  ngOnInit() {
    this.user_role = sessionStorage.getItem("role");
    this.loggedinname = sessionStorage.getItem("name");
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.city = sessionStorage.getItem("city");
    this.mobNumber = sessionStorage.getItem("mobNumber");
    this.addEditProductForm = this.formBuilder.group({
      name: ["", Validators.required],
      uploadPhoto: ["", Validators.required],
      productDesc: ["", Validators.required],
      mrp: ["", Validators.required],
      dp: ["", Validators.required],
      status: ["", Validators.required],
    });
  }

  get rf() {
    return this.addEditProductForm.controls;
  }

  addNewProduct() {
    this.addEditProduct = true;
    console.log("inside new");
    
    if (this.addEditProductForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
      addedBy: this.loggedinname,
      user_session_id: this.user_session_id,
      isshopowner:this.isshopowner,
      role: this.user_role,
      mobNumber: this.mobNumber,
      city: this.city,
    };
    this.product_service.addNewProduct(this.product_dto).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl("/farmer/product");
    }
    );
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
      addedBy: this.loggedinname,
      user_session_id: this.user_session_id,
      isshopowner:this.isshopowner,
      role: this.user_role,
      city: this.city,
      mobNumber: this.mobNumber
    };
    this.product_service
      .updateProduct(this.edit_product_id, this.product_dto)
      .subscribe(
        (data) => {
          // console.log(data);
          jQuery("#addEditProductModal").modal("toggle");
        },
        (err) => {
          alert("Some Error Occured");
        }
      );
  }
}
