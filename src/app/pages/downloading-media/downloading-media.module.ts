import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { DownloadingMediaCardComponent } from './downloading-media-card';
import { DownloadingMediaComponent } from './downloading-media.component';
import { DownloadingMediaRouting } from './downloading-media.routing';
import { MediaDownloadCancelBottomSheetComponent } from './media-download-cancel-bottom-sheet';

@NgModule({
    declarations: [
        DownloadingMediaComponent,
        DownloadingMediaCardComponent,
        MediaDownloadCancelBottomSheetComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        DownloadingMediaRouting
    ]
})
export class DownloadingMediaModule {}
