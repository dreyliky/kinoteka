import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadedSectionModule } from './downloaded-section';
import { DownloadingSectionModule } from './downloading-section';
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
        DownloadsRouting,
        DownloadedSectionModule,
        DownloadingSectionModule
    ]
})
export class DownloadsModule {}
