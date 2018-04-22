import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3000/api';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomers() {
        return this.http.get(apiUrl + '/customers');
    }
}
