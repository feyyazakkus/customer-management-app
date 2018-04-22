import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3000/api';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomers() {
        return this.http.get(apiUrl + '/customers');
    }

    getCustomerById(id) {
        return this.http.get(apiUrl + '/customers/' + id);
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
