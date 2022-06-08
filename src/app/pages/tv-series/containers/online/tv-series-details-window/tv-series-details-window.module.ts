import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadButtonComponent } from './download-button';
import { FavoriteButtonComponent } from './favorite-button';
import { FilmDownloadProgressComponent } from './film-download-progress';
import { TvSeriesDetailsWindowComponent } from './tv-series-details-window.component';

@NgModule({
    declarations: [
        TvSeriesDetailsWindowComponent,
        FilmDownloadProgressComponent,
        DownloadButtonComponent,
        FavoriteButtonComponent
    ],
    imports: [
        SharedModule
    ]
})
export class TvSeriesDetailsWindowModule {}
