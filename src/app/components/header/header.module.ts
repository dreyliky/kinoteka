import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {}
