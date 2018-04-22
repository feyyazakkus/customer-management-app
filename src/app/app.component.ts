import { Component } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';

declare var $:any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';

    constructor () {}
}
