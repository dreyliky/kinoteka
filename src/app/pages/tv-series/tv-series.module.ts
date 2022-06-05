import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TvSeriesComponent } from './tv-series.component';
import { TvSeriesRouting } from './tv-series.routing';

@NgModule({
    declarations: [
        TvSeriesComponent
    ],
    imports: [
        SharedModule,
        TvSeriesRouting
    ]
})
export class TvSeriesModule {}
