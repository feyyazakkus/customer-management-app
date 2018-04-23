import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'https://customer-management-api.herokuapp.com/api';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomers() {
        return this.http.get(apiUrl + '/customers');
    }

    getCustomerById(id: number): Observable<any> {
        return this.http.get(apiUrl + '/customers/' + id).catch(error => {
            return Observable.throw(error);
         });
    }

    updateCustomer(customer) {
        return this.http.put(apiUrl + '/customers/' + customer.customerID, customer);
    }

    addCustomer(customer) {
        return this.http.post(apiUrl + '/customers', customer);
    }

    deleteCustomer(id) {
        return this.http.delete(apiUrl + '/customers/' + id);
    }
}
