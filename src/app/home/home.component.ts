import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    customers: Customer[];
    
        constructor (private customerService: CustomerService) {}
    
        getCustomers() {
            this.customerService.getCustomers().subscribe((response:any) => {
                if (response.success) {
                    this.customers = response.customers;
                }
            });
        }
        
        ngOnInit() {
            this.getCustomers();
        }

}
