import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '../icon/icon.module';
import { YearPickerComponent } from './year-picker.component';

@NgModule({
    declarations: [
        YearPickerComponent
    ],
    imports: [
        CommonModule,
        IconModule,
        MatButtonModule,
        MatChipsModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        YearPickerComponent
    ]
})
export class YearPickerModule {}
