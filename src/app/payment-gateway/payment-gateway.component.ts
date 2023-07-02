import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  user_role = '';

  constructor() { }

  ngOnInit() {
    this.user_role = sessionStorage.getItem("role");

  }

}
