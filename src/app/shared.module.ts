import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { FilterPipe } from './pipes/filter.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [
        FilterPipe,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MyDatePickerModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        MyDatePickerModule,
        FilterPipe,
        LoaderComponent,
        NgxPaginationModule
    ],
    providers: [
        DatePipe
    ]
})

export class SharedModule {
}
