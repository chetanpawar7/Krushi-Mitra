import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../core/models/object-model";
declare var jQuery: any;

@Component({
  selector: "app-product-crud",
  templateUrl: "./product-crud.component.html",
  styleUrls: ["./product-crud.component.scss"],
})
export class ProductCrudComponent implements OnInit {
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
  mobNumber = "";
  city = "";
  role='';
  isshopowner: boolean;
  public display: number = 1;


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
      role: ["", Validators.required],
      mobNumber: ["", Validators.required],
      city: ["", Validators.required]
    });
    this.getAllProduct();
    this.getmyProduct();
  }

  get rf() {
    return this.addEditProductForm.controls;
  }

  getAllProduct() {
    this.product_service.allProduct(this.user_session_id).subscribe((data) => {
      this.all_product_data = data;
      console.log(data);
    });
  }

  getmyProduct() {
    this.product_service.allProduct(this.user_session_id).subscribe((data) => {
      this.my_product_data = data.filter(
        (product) => product.user_session_id == this.user_session_id
      );
    });
  }

  // Search() {
  Search(): void {
    if (this.name === "") {
      this.ngOnInit();
    } else {
      this.my_product_data = this.my_product_data.filter(
        (res: { name: string }) => {
          return res.name.toLowerCase().includes(this.name.toLowerCase());
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

// myproduct
  Search1(): void {
    if (this.name === "") {
      this.ngOnInit();
    } else {
      this.all_product_data = this.all_product_data.filter(
        (res: { name: string }) => {
          return res.name.toLowerCase().includes(this.name.toLowerCase());
        }
      );
    }
  }
  changeDisplay(mode: number): void {
    this.display = mode;
  }


  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Crop";
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    this.isshopowner = false;
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
      isshopowner: this.isshopowner,
      role: this.role,
      mobNumber: this.mobNumber,
      city: this.city,
    };
    this.product_service.addNewProduct(this.product_dto).subscribe(
      (data) => {
        console.log(data);
        jQuery("#addEditProductModal").modal("toggle");
        this.getAllProduct();
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
      isshopowner: this.isshopowner,
      role: this.user_role,
      city: this.city,
      mobNumber: this.mobNumber
    };
    this.product_service
      .updateProduct(this.edit_product_id, this.product_dto)
      .subscribe((data) => {
        // console.log(data);
        jQuery("#addEditProductModal").modal("toggle");
        this.getAllProduct();
        this.getmyProduct();
      });
  }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.product_service.deleteProduct(id).subscribe(
        (data) => {
          console.log("deleted successfully", data);
          this.getAllProduct();
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
