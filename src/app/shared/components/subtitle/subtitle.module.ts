import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubtitleComponent } from './subtitle.component';

@NgModule({
    declarations: [
        SubtitleComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SubtitleComponent
    ]
})
export class SubtitleModule {}
