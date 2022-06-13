import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { DownloaderComponent } from './downloader.component';
import { DownloaderRouting } from './downloader.routing';
import { SearchComponent } from './search';

@NgModule({
    declarations: [
        DownloaderComponent,
        SearchComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        DownloaderRouting
    ]
})
export class DownloaderModule {}
