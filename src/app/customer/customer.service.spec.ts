import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import { Customer } from './customer.model';

describe('CustomerService', () => {

    let service: CustomerService;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CustomerService]
        });
    }));

    beforeEach(() => {
        service = TestBed.get(CustomerService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrive customers on api/customers', () => {

        const dummyData = {
            "success": true,
            "customers": [
                {
                    "name": {
                        "first": "Janis",
                        "last": "Joplin"
                    },
                    "lastContact": "2018-08-11T18:53:04.020Z",
                    "created_at": "2018-08-11T18:53:04.020Z",
                    "birthday": "1943-01-19",
                    "gender": "m",
                    "customerID": 81,
                },
                {
                    "name": {
                        "first": "Matthew",
                        "last": "Bellamy"
                    },
                    "lastContact": "2018-08-11T18:51:14.713Z",
                    "created_at": "2018-08-11T18:51:14.713Z",
                    "birthday": "1978-06-09",
                    "gender": "m",
                    "customerID": 80,
                }
            ]
        }

        service.getCustomers(2, 0, 'customerID', 1).subscribe((data: any) => {
            expect(data.customers.length).toBe(2);
            expect(data.success).toEqual(true);
        });

        const request = httpMock.expectOne(`${service.apiUrl}/customers`);

        expect(request.request.method).toBe('POST');

        request.flush(dummyData);
    });
});
