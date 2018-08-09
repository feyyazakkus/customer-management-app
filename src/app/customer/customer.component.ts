import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './customer.service';
import { ICustomer, Customer } from './customer.model';
import { DatePipe } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { IMyDateFormat } from 'mydatepicker/dist/interfaces';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerComponent implements OnInit {

    id: number;
    customer: ICustomer;
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
                    this.customer = new Customer(res.customer);
                    this.birthday = this.customerService.setBirthdayDate(this.customer.birthday);
                    this.lastContact = this.customerService.setLastContactDate(this.customer.lastContact);
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
