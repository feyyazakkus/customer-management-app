import { Component } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';

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
        this.customerService.getCustomers().subscribe((res) => {
            console.log(res);
        });
    }

    ngOnInit() {
        this.getCustomers();
    }

}
