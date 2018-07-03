import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICustomer } from './customer.model';

import { appConfig } from '../app.config';

@Injectable()
export class CustomerService {

    constructor(
        private http: HttpClient
    ) { }

    private apiUrl = appConfig.apiUrl;

    getCustomers(): Observable<any> {
        return this.http.get(this.apiUrl + '/customers');
    }

    getCustomerById(id: number): Observable<any> {
        return this.http.get(this.apiUrl + '/customers/' + id);
    }

    updateCustomer(customer) {
        return this.http.put(this.apiUrl + '/customers/' + customer.customerID, customer);
    }

    addCustomer(customer) {
        return this.http.post(this.apiUrl + '/customers', customer);
    }

    deleteCustomer(id) {
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
        }
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
}
