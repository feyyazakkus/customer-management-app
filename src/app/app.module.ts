import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './filter.pipe';

import { CustomerService } from './customer.service';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customer/:id', component: CustomerComponent }, 
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MyDatePickerModule
  ],
  providers: [CustomerService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
