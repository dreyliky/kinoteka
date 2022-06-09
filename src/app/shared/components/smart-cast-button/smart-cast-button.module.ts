import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconModule } from '../icon';
import { SmartCastButtonComponent } from './smart-cast-button.component';

@NgModule({
    declarations: [
        SmartCastButtonComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        IconModule
    ],
    exports: [
        SmartCastButtonComponent
    ]
})
export class SmartCastButtonModule {}
