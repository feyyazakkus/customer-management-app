import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { ICustomer, Customer } from '../customer/customer.model';
import { DatePipe } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    customer: ICustomer;
    customers: ICustomer[];
    birthday: any;
    alert: string;
    searchText: string;
    isLoading: boolean;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
    pageIndex: number = 1;
    pageSize: number = 5;
    pageSizes: Array<number>;
    totalSize: number;
    sortingRules: Object[];
    sortBy: string = 'customerID';
    sortDirection: number = 1;
    totalCount: number;
    loading: boolean = false;
    onOptionsChanged: BehaviorSubject<Object> = new BehaviorSubject(null);
    
    constructor (
        private customerService: CustomerService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.sortingRules = this.customerService.getSortingRules();
        this.pageSizes = this.customerService.getPageSizes();
        this.customer = new Customer({});

        this.onOptionsChanged.subscribe((options) => {
            if (options instanceof Object) {
                this.getCustomers();
            }
        });

        this.getCustomers();
    }

    getCustomers() {
        this.loading = true;
        
        this.customerService.getCustomers(
            this.pageIndex,
            this.pageSize,
            this.sortBy,
            this.sortDirection)
        .subscribe((response:any) => {
            if (response.success) {
                this.customers = response.customers;
                this.totalCount = response.totalCount;
            }

            this.loading = false;
        });
    }
    
    addCustomer() {
        if (this.validateCustomerForm(this.customer)) {
            this.customerService.addCustomer(this.customer).subscribe((res:any) => {
                if (res.success) {
                    $('#addCustomer').modal('hide');
                    this.customer = new Customer({});
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

    onPageChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.onOptionsChanged.next({});
    }

    changeSortDirection() {
        this.sortDirection = this.sortDirection == 1 ? -1 : 1;
        this.onOptionsChanged.next({});
    }
}
