import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadedVideoCardComponent, VideoCardComponent } from './components';

@NgModule({
    declarations: [
        VideoCardComponent,
        DownloadedVideoCardComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        VideoCardComponent,
        DownloadedVideoCardComponent
    ]
})
export class VideoModule {}
