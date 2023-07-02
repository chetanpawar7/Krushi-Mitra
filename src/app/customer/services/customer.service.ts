import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from 'src/app/core/models/object-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private single_product_id = new BehaviorSubject(null);
  currentProduct = this.single_product_id.asObservable();

  public product_url = environment.server_url + '/products/';
  public user_url = environment.server_url + '/user/';
  public order_url = environment.server_url + '/orders/';
  public feedback = environment.server_url + '/feedbacks/';
  apiUrl: any;
  http: any;

  constructor(private apiService: ApiService) { }

  allProduct(): Observable<any> {
    return this.apiService.get(this.product_url)
  }

  submitForm(formData: any): Observable<any> {
    return this.apiService.post(this.feedback, formData);
  }

  allfeedbacks(){
    return this.apiService.get(this.feedback)
  }

  allorder(): Observable<any> {
    return this.apiService.get(this.order_url)
  }

  quickBuyProduct(product_id: number) {
    this.single_product_id.next(product_id)
  }

  individualProduct(id) {
    return this.apiService.get(this.product_url + id)
  }
  userDetail(id) {
    return this.apiService.get(this.user_url + id)
  }
  insertNewOrder(order_dto): Observable<any> {
    return this.apiService.post(this.order_url, order_dto);
  }

  singleOrder(id) {
    return this.apiService.get(this.order_url + id)
  }

  update(id: number,transactions: any){
    return this.apiService.put(this.order_url + id)
  }

  updateorder(id, order_dto): Observable<any> {
    return this.apiService.put(this.order_url + id, order_dto);
  }

  updateOrder(id, order_dto): Observable<any> {
    // const url = `${this.apiService}/${order.id}`;
    // return this.http.put(this.order_url, order);
    return this.apiService.put(this.order_url + id, order_dto);

  }

  find(id){
    return this.apiService.get(this.order_url + id)
  }

  individualOrder(id) {
    return this.apiService.get(this.order_url + id)
  }

  single_order_data(id) {
    return this.apiService.get(this.order_url + id)
  }
  // updateOrder1(id, order_dto): Observable<any> {
  //   return this.apiService.post(this.order_url + id, order_dto);
  // }

  deleteorder(id): Observable<any> {
    return this.apiService.delete(this.order_url + id);
  }

  orderDashboardData(): Observable<any> {
    return this.apiService.get(this.order_url)
  }
  productDashboardData(): Observable<any> {
    return this.apiService.get(this.product_url)
  }

  // updateOrder(orderId: number, updatedOrderData: any): Observable<any> {
  //   const url = `${this.apiService}/${orderId}`;
  //   return this.http.put(url, updatedOrderData);
  // }
}
