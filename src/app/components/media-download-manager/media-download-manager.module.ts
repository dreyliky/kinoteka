import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MediaDownloadManagerComponent } from './media-download-manager.component';

@NgModule({
    declarations: [
        MediaDownloadManagerComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        MediaDownloadManagerComponent
    ]
})
export class MediaDownloadManagerModule {}
