import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ApiService } from "../../core/services/api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/object-model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  public product_url = environment.server_url + "/products/";

  public product_url1 = environment.server_url + "/scheme/";

  products: any;

  constructor(private apiService: ApiService, private http: HttpClient) {}

  allProduct(user_session_id): Observable<any> {
    return this.apiService.get(this.product_url);
  }
  addNewScheme(scheme_dto): Observable<any> {
    return this.apiService.post(this.product_url1, scheme_dto);
  }
  allScheme(user_session_id): Observable<any> {
    return this.apiService.get(this.product_url1);
  }
  singleScheme(id) {
    return this.apiService.get(this.product_url1 + id);
  }
  updateScheme(id, scheme_dto): Observable<any> {
    return this.apiService.put(this.product_url1 + id, scheme_dto);
  }
  deleteScheme(id): Observable<any> {
    return this.apiService.delete(this.product_url1 + id);
  }

  addNewProduct(product_dto): Observable<any> {
    return this.apiService.post(this.product_url, product_dto);
  }

  getAllusers() {
    return this.apiService.get(environment.server_url + "/user");
  }

  getAllorders() {
    return this.apiService.get(environment.server_url + "/orders");
  }

  singleProduct(id) {
    return this.apiService.get(this.product_url + id);
  }
  updateProduct(id, product_dto): Observable<any> {
    return this.apiService.put(this.product_url + id, product_dto);
  }
  deleteProduct(id): Observable<any> {
    return this.apiService.delete(this.product_url + id);
  }

  addtocart(product: any) {
    let resp: any = this.http.post(this.product_url + "/cart/", product);
    return resp;
  }
  cartitems() {
    let resp: any = this.http.get(this.product_url + "/cart");
    return resp;
  }

  deleteCartItem(id: any) {
    let resp: any = this.http.delete(this.product_url + "/cart/" + id);
    return resp;
  }

  cartcount(productslist) {
    let resp: any = this.http.get(productslist);
    return resp;
  }

  // Create
  addProduct(product: any): void {
    this.products.push(product);
  }

  // Read
  getAllProducts(): any[] {
    return this.products;
  }

  getProductById(id: number): any {
    return this.products.find((product) => product.id === id);
  }

  // Update
  updateProduct1(product: any): void {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  // Delete
  deleteProduct1(id: number): void {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}
function scheme_dto(arg0: string, scheme_dto: any): Observable<any> {
  throw new Error("Function not implemented.");
}

