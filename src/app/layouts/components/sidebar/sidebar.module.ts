import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        SidebarComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SidebarComponent
    ]
})
export class SidebarModule {}
