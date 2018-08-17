import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICustomer, Customer } from './customer.model';
import { appConfig } from '../app.config';

enum SortDirection {
    ASC = 1,
    DESC = -1
}

@Injectable()
export class CustomerService {

    constructor(
        private http: HttpClient
    ) { }

    apiUrl: string = appConfig.apiUrl;

    getCustomers(
        pageIndex: number,
        pageSize: number,
        sortBy: string,
        sortDirection: SortDirection
    ): Observable<any> {
        let options = {
            limit: pageSize,
            offset: (pageIndex - 1) * pageSize,
            sortBy: sortBy,
            sortDirection: sortDirection
        }

        return this.http.post(this.apiUrl + '/customers', options);
    }

    getCustomerById(id: number): Observable<any> {
        return this.http.get(this.apiUrl + '/customers/' + id);
    }

    updateCustomer(customer: Customer) {
        return this.http.put(this.apiUrl + '/customers/' + customer.customerID, customer);
    }

    addCustomer(customer: Customer) {
        return this.http.post(this.apiUrl + '/customers/add', customer);
    }

    deleteCustomer(id: number) {
        return this.http.delete(this.apiUrl + '/customers/' + id);
    }

    setBirthdayDate(birthday) {
        // set birthday for datepicker
        let birthdayDate = new Date(birthday);
        return {
            date: {
                year: birthdayDate.getFullYear(),
                month: birthdayDate.getMonth() + 1,
                day: birthdayDate.getDate(),
            }
        };
    }

    setLastContactDate(lastContact) {
        // set last contact date for datepicker
        let lastContactDate = new Date(lastContact);
        return {
            date: {
                year: lastContactDate.getFullYear(),
                month: lastContactDate.getMonth() + 1,
                day: lastContactDate.getDate(),
            }
        }
    }

    getSortingRules() {
        return [
            { label: 'Customer No', value: 'customerID'},
            { label: 'Name', value: 'name.first'},
            { label: 'Birthday', value: 'birthday'},
            { label: 'Gender', value: 'gender'},
            { label: 'Last Contact', value: 'lastContact'}
        ];
    }

    getPageSizes() {
        return [5, 10, 20, 30, 50];
    }
}
