import { Component } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { Observable } from "rxjs/Rx"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

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
