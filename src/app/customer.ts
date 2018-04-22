export class Customer {
    customerID: number;
    name: {
        first: string,
        last: string,
    };
    birthday: string;
    gender: string;
    lastContact: Date;
    customerLifetimeValue: number;

    constructor () {
        this.name = {
            first: '',
            last: ''
        };
    }
}
