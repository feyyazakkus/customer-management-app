import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { MyDatePickerModule } from 'mydatepicker';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
    declarations: [
        FilterPipe
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
        FilterPipe
    ],
    providers: [
        DatePipe
    ]
})

export class SharedModule {
}
