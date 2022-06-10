import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {
    FooterModule,
    HeaderModule,
    ScrollTopButtonModule,
    SidebarModule
} from './components';
import { MainLayoutComponent } from './main';

@NgModule({
    declarations: [
        MainLayoutComponent
    ],
    imports: [
        SharedModule,
        FooterModule,
        HeaderModule,
        SidebarModule,
        ScrollTopButtonModule
    ],
    exports: [
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
