import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadedSectionModule } from './downloaded-section';
import { DownloadingSectionModule } from './downloading-section';
import { DownloadsComponent } from './downloads.component';
import { DownloadsRouting } from './downloads.routing';

@NgModule({
    declarations: [
        DownloadsComponent
    ],
    imports: [
        SharedModule,
        DownloadsRouting,
        DownloadedSectionModule,
        DownloadingSectionModule
    ]
})
export class DownloadsModule {}
