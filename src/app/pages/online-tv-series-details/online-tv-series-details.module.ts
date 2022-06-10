import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { AllEpisodesBaseMediaPipe, DownloadButtonComponent } from './components';
import { OnlineTvSeriesDetailsComponent } from './online-tv-series-details.component';
import { OnlineTvSeriesDetailsRouting } from './online-tv-series-details.routing';

@NgModule({
    declarations: [
        OnlineTvSeriesDetailsComponent,
        DownloadButtonComponent,
        AllEpisodesBaseMediaPipe
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        OnlineTvSeriesDetailsRouting
    ]
})
export class OnlineTvSeriesDetailsModule {}
