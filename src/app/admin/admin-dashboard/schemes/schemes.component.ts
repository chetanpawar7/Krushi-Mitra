import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Product, Scheme } from "src/app/core/models/object-model";
import { ProductService } from "src/app/shared/services/product.service";
declare var jQuery: any;

@Component({
  selector: "app-schemes",
  templateUrl: "./schemes.component.html",
  styleUrls: ["./schemes.component.scss"],
})
export class SchemesComponent implements OnInit {
  all_product_data;

  all_scheme_data;
  my_scheme_data;

  my_product_data;
  addEditProductForm2: FormGroup;
  addEditProduct: boolean = false; //for form validation
  popup_header: string;
  add_product: boolean;
  edit_product: boolean;

  product_data;
  product_dto: Product;

  scheme_data;
  scheme_dto: Scheme;
  single_scheme_data;
  edit_scheme_id;

  single_product_data;
  edit_product_id;
  user_session_id: any;
  name: any;
  loggedinname = "";
  user_role = "";
  isshopowner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService
  ) {}

  ngOnInit() {
    this.user_role = sessionStorage.getItem("role");
    this.loggedinname = sessionStorage.getItem("name");
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.addEditProductForm2 = this.formBuilder.group({
      name: ["", Validators.required],
      total_benifits: ["", Validators.required],
      date: ["", Validators.required],
      schemeFor: ["", Validators.required],
      links: ["", Validators.required],
    });
    this.getAllScheme();
    this.getmyProduct();
  }

  get rf() {
    return this.addEditProductForm2.controls;
  }

  getAllScheme() {
    this.product_service.allScheme(this.user_session_id).subscribe((data) => {
      this.all_scheme_data = data;
      console.log(data);
    });
  }

  getmyProduct() {
    this.product_service.allScheme(this.user_session_id).subscribe((data) => {
      this.my_scheme_data = data.filter(
        (scheme) => scheme.user_session_id == this.user_session_id
      );
    });
  }

  Search() {
    if (this.name == "") {
      this.ngOnInit();
    } else {
      this.all_scheme_data = this.all_scheme_data.filter(
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
    this.popup_header = "Add New Scheme";
    this.addEditProductForm2.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm2.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.scheme_data = this.addEditProductForm2.value;
    this.scheme_dto = {
      id: 0,
      name: this.scheme_data.name,
      total_benifits: this.scheme_data.total_benifits,
      date: this.scheme_data.date,
      schemeFor: this.scheme_data.schemeFor,
      links: this.scheme_data.links,
    };
    this.product_service.addNewScheme(this.scheme_dto).subscribe((data) => {
      console.log(data);
      jQuery("#addEditProductModal").modal("toggle");
      this.getmyProduct();
      this.get();
    });
  }

  editProductPopup(id) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm2.reset();
    this.product_service.singleScheme(id).subscribe((data) => {
      this.single_scheme_data = data;
      this.edit_product_id = data.id;
      // console.log("single_product_data", this.single_product_data)
      this.addEditProductForm2.setValue({
        name: this.single_scheme_data.name,
        total_benifits: this.single_scheme_data.total_benifits,
        date: this.single_scheme_data.date,
        schemeFor: this.single_scheme_data.schemeFor,
        links: this.single_scheme_data.links,
      });
    });
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm2.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.scheme_data = this.addEditProductForm2.value;
    this.scheme_dto = {
      id: 0,
      name: this.scheme_data.name,
      total_benifits: this.scheme_data.total_benifits,
      date: this.scheme_data.date,
      schemeFor: this.scheme_data.schemeFor,
      links: this.scheme_data.links,
    };
    this.product_service
      .updateScheme(this.edit_product_id, this.scheme_dto)
      .subscribe((data) => {
        // console.log(data);
        jQuery("#addEditProductModal").modal("toggle");
        // this.getmyProduct();
        // this.getAllScheme();
      this.get();
      });
  }

  get(){
    setTimeout(() => {
      this.getAllScheme();
    }, 1000);
  }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.product_service.deleteScheme(id).subscribe((data) => {
        console.log("deleted successfully", data);
        this.getAllScheme();
      });
    } else {
      alert("You pressed Cancel!");
    }
  }
}
