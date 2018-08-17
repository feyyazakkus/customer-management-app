import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared.module';

import { CustomerService } from './customer/customer.service';
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    SharedModule
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
