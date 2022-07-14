import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { BookmarkButtonComponent, VideoDeleteBottomSheetComponent } from './components';
import { DownloadedVideoComponent } from './downloaded-video.component';
import { DownloadedVideoRouting } from './downloaded-video.routing';

@NgModule({
    declarations: [
        DownloadedVideoComponent,
        VideoDeleteBottomSheetComponent,
        BookmarkButtonComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        DownloadedVideoRouting
    ]
})
export class DownloadedVideoModule {}
