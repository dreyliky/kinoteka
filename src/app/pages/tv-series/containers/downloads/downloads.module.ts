import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadsComponent } from './downloads.component';
import { DownloadsRouting } from './downloads.routing';
import { HeaderPortalContentComponent } from './header-portal-content';

@NgModule({
    declarations: [
        DownloadsComponent,
        HeaderPortalContentComponent
    ],
    imports: [
        SharedModule,
        DownloadsRouting
    ]
})
export class DownloadsModule {}
