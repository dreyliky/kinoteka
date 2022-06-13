import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { AllEpisodesBaseMediaPipe, DownloadButtonComponent } from './components';
import { OnlineTvSeriesComponent } from './online-tv-series.component';
import { OnlineTvSeriesRouting } from './online-tv-series.routing';

@NgModule({
    declarations: [
        OnlineTvSeriesComponent,
        DownloadButtonComponent,
        AllEpisodesBaseMediaPipe
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        OnlineTvSeriesRouting
    ]
})
export class OnlineTvSeriesModule {}
