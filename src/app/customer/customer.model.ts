export interface ICustomer {
    customerID: number;
    name: {
        first: string,
        last: string,
    };
    birthday: string | Date;
    gender: string;
    lastContact: string | Date;
    customerLifetimeValue: number;
}

export class Customer {
    customerID: number;
    name: {
        first: string,
        last: string,
    };
    birthday: string | Date;
    gender: string;
    lastContact: string | Date;
    customerLifetimeValue: number;

    constructor (customer) {
        this.customerID = customer.customerID || null;

        this.name = {
            first: customer.name ? customer.name.first : '',
            last: customer.name ? customer.name.last : ''
        };

        this.birthday = customer.birthday || '';
        this.gender = customer.gender || 'm';
        this.lastContact = customer.lastContact || '';
        this.customerLifetimeValue = customer.customerLifetimeValue || '';
    }
}