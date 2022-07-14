import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { DownloadedVideoCardComponent } from './downloaded-video-card';

@NgModule({
    declarations: [
        DownloadedVideoCardComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        DownloadedVideoCardComponent
    ]
})
export class VideosSharedModule {}
