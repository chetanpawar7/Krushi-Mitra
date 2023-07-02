import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/object-model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {

  all_products;
  show_checkout: Boolean = false;
  isshopowner:boolean;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.getAllProduct()
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe(data => {
      // this.all_products = data;
      // console.log("ALl Product", this.all_products);
      this.all_products = data.filter(
        (product) => product.status === 'active'
      );
    })
  }

  buyProduct(id) {
    this.show_checkout = true;
    this.isshopowner = false;
    this.customerService.quickBuyProduct(id) //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/merchant/checkout");
  }

  addToCart() {
  }

}
