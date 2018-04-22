import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { DatePipe } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { IMyDateFormat } from 'mydatepicker/dist/interfaces';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

    id: number;
    customer: Customer;
    birthday: any;
    lastContact: any;
    isLoading: boolean;
    alert: string;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = parseInt(params['id']);
            // get customer
            this.customerService.getCustomerById(this.id).subscribe((res:any) => {
                if (res.success) {
                    this.customer = res.customer;
                    
                    // set birthday for datepicker
                    var birthday = new Date(res.customer.birthday);
                    this.birthday = {
                        date: {
                            year: birthday.getFullYear(),
                            month: birthday.getMonth() + 1,
                            day: birthday.getDate(),
                        }
                    }

                    // set last contact date for datepicker
                    var lastContact = new Date(res.customer.lastContact);
                    this.lastContact = {
                        date: {
                            year: lastContact.getFullYear(),
                            month: lastContact.getMonth() + 1,
                            day: lastContact.getDate(),
                        }
                    }
                }
            });
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.resetAlert();
        
        this.customerService.updateCustomer(this.customer)
        .subscribe((res:any) => {
            if (res.success) {
                this.alert = 'success';
                this.isLoading = false;    
            }
        });
    }

    onBirthDayChange(event) {
        this.customer.birthday = this.datePipe.transform(new Date(event.jsdate), 'yyyy-MM-dd');
    }

    onLastContactChange(event) {
        this.customer.lastContact = event.jsdate.toISOString();
    }

    resetAlert() {
        this.alert = '';
    }
}
