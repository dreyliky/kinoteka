import { NgModule } from '@angular/core';
import { ClientModule } from './client';
import { FilmModule } from './film';
import { TvSeriesModule } from './tv-series';
import { VideoModule } from './video';

@NgModule({
    exports: [
        FilmModule,
        TvSeriesModule,
        VideoModule,
        ClientModule
    ]
})
export class FeaturesModule {}
