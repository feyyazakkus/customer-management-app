import { APP_BASE_HREF } from "@angular/common";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { DatePipe } from "@angular/common/src/pipes/date_pipe";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from "../shared.module";
import { CustomerService } from "../customer/customer.service";
import { HomeComponent } from "./home.component";
import { CustomerComponent } from "../customer/customer.component";
import { Customer } from "../customer/customer.model";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'customer/:id', component: CustomerComponent }, 
  ];

describe('HomeComponent', () => {

    let component: HomeComponent;
    let testBedService: CustomerService;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CustomerComponent,
                HomeComponent
            ],
            imports: [
                SharedModule,
                RouterModule.forRoot(appRoutes),
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                CustomerService,
                HttpClient, HttpHandler
            ]
        });
        
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        // dummy data
        let customers = [];
        customers.push({
            "name": {
                "first": "Eddie",
                "last": "Vedder"
            },
            "lastContact": "2018-08-11T18:45:57.726Z",
            "created_at": "2018-08-11T18:45:57.726Z",
            "birthday": "1964-12-23",
            "gender": "m",
            "customerID": 76
        });
        customers.push({
            "name": {
                "first": "Chester",
                "last": "Bennington"
            },
            "lastContact": "2018-08-11T18:48:18.339Z",
            "created_at": "2018-08-11T18:48:18.339Z",
            "birthday": "1976-03-20",
            "gender": "m",
            "customerID": 77
        });

        component.customers = customers;
    });

    it('should get the customers length', () => {
       expect(component.customers.length).toEqual(2);
    });

    it('should get the title', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.title').innerText).toEqual('Customer Management');
    });
});