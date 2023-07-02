import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos'; //AOS - 1
import { CustomerService } from '../customer/services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string;
  email: string;
  subject: string;
  message: string;

  constructor(private http: HttpClient, public customerservice: CustomerService, public router: Router) { }

  submitForm() {
    // Handle form submission logic here, such as sending the data to a server
    const formData = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    this.customerservice.submitForm(formData)
    .subscribe(
      response => {
        console.log('Form submitted successfully!');
        alert("Form Submitted!");
        this.pagerelod();
        // Handle any success response from the server
      },
      error => {
        console.error('Form submission failed!');
        // Handle any error response from the server
      }
    );
  }
  ngOnInit() {
    AOS.init({disable: 'mobile'});//AOS - 2
    AOS.refresh();
  }

  pagerelod(){
    this.router.navigate(["/home"]);
  }

}
