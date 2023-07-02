import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/services/customer.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
  feedbacks: any;

  constructor(public customerservice: CustomerService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.customerservice.allfeedbacks().subscribe((data) => {
      this.feedbacks = data;
      console.log(data);
    });
  }

}
