import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from 'src/app/core/models/object-model';
import { ProductService } from 'src/app/shared/services/product.service';
declare var jQuery: any;


@Component({
  selector: 'app-shopowner',
  templateUrl: './shopowner.component.html',
  styleUrls: ['./shopowner.component.scss']
})
export class ShopownerComponent implements OnInit {

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
  user_role = '';
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
    this.mobNumber = sessionStorage.getItem("mobNumber");
    this.city = sessionStorage.getItem("city");
    this.addEditProductForm = this.formBuilder.group({
      name: ["", Validators.required],
      uploadPhoto: ["", Validators.required],
      productDesc: ["", Validators.required],
      mrp: ["", Validators.required],
      dp: ["", Validators.required],
      status: ["", Validators.required],
    });
    // this.getAllProduct();
    this.getmyProduct()
  }

  get rf() {
    return this.addEditProductForm.controls;
  }

  getAllProduct() {
      this.product_service.allProduct(this.user_session_id).subscribe(data => {
        this.all_product_data = data;
      }
    );
  }

  getmyProduct() {
    this.product_service.allProduct(this.user_session_id).subscribe(
      (data) => {
        this.my_product_data = data.filter(
          (product) => product.user_session_id == this.user_session_id  && product.isshopowner === true
        );
      }
    );
  }

  
  Search() {
    if (this.name == "") {
      this.ngOnInit();
    } else {
      this.my_product_data = this.my_product_data.filter(
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

  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product";
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    this.isshopowner = true;
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
      isshopowner: this.isshopowner,
      user_session_id: this.user_session_id,
      role: this.user_role,
      city: this.city,
      mobNumber: this.mobNumber,
    };
    this.product_service.addNewProduct(this.product_dto).subscribe(
      (data) => {
        // console.log(data);
        jQuery("#addEditProductModal").modal("toggle");
        this.getmyProduct();
      },
      (err) => {
        alert("Some Error Occured");
      }
    );
  }

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
        // uploadPhoto: '',
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status,
      });
    });
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
      isshopowner: true,
      role: this.user_role,
      mobNumber: this.mobNumber,
      city: this.city,
    };
    this.product_service
      .updateProduct(this.edit_product_id, this.product_dto)
      .subscribe(
        (data) => {
          // console.log(data);
          jQuery("#addEditProductModal").modal("toggle");
          this.getmyProduct();
        },
        (err) => {
          alert("Some Error Occured");
        }
      );
  }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.product_service.deleteProduct(id).subscribe(
        (data) => {
          console.log("deleted successfully", data);
          this.getmyProduct();
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
