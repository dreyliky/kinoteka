import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { TvSeriesCardComponent } from './tv-series-card';

@NgModule({
    declarations: [
        TvSeriesCardComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        TvSeriesCardComponent
    ]
})
export class TvSeriesesSharedModule {}
