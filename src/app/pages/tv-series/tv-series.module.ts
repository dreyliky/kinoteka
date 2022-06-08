import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SectionChipsComponent } from './components';
import { TvSeriesComponent } from './tv-series.component';
import { TvSeriesRouting } from './tv-series.routing';

@NgModule({
    declarations: [
        TvSeriesComponent,
        SectionChipsComponent
    ],
    imports: [
        SharedModule,
        TvSeriesRouting
    ]
})
export class TvSeriesModule {}
