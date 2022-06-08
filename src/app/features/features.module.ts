import { NgModule } from '@angular/core';
import { FilmModule } from './film';
import { TvSeriesModule } from './tv-series';

@NgModule({
    exports: [
        FilmModule,
        TvSeriesModule
    ]
})
export class FeaturesModule {}
