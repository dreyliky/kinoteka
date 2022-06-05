import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ScrollTopButtonComponent } from './scroll-top-button.component';

@NgModule({
    declarations: [
        ScrollTopButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ScrollTopButtonComponent
    ]
})
export class ScrollTopButtonModule {}
