import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { DatePipe } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    customer: Customer;
    customers: Customer[];
    birthday: any;
    alert: string;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
    
    constructor (
        private customerService: CustomerService,
        private datePipe: DatePipe
    ) { }

    getCustomers() {
        this.customerService.getCustomers().subscribe((response:any) => {
            if (response.success) {
                this.customers = response.customers;
            }
        });
    }
    
    addCustomer() {
        if (this.validateCustomerForm(this.customer)) {
            this.customerService.addCustomer(this.customer).subscribe((res:any) => {
                if (res.success) {
                    $('#addCustomer').modal('hide');
                    this.customer = new Customer();
                    this.getCustomers();
                }
            });
        }
    }

    deleteCustomer(customerID) {
        if (confirm("Are you sure you want to delete this customer?")) {
            this.customerService.deleteCustomer(customerID).subscribe((res:any) => {
                if (res.success) {
                    this.getCustomers();
                }
            });
        }
    }

    onBirthDayChange(event) {
        this.customer.birthday = this.datePipe.transform(new Date(event.jsdate), 'yyyy-MM-dd');
    }

    validateCustomerForm(data) {
        this.alert = '';
        if (data.name.first === '' || data.name.last === '' || !data.birthday || data.birthday === '1970-01-01') {
            this.alert = 'required';
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.customer = new Customer();
        this.getCustomers();
    }
}
