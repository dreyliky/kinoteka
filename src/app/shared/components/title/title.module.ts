import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TitleComponent } from './title.component';

@NgModule({
    declarations: [
        TitleComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TitleComponent
    ]
})
export class TitleModule {}
