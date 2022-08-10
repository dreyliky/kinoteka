import { NgModule } from '@angular/core';
import { BookmarkModule } from './bookmark';
import { ClientModule } from './client';
import { FilmModule } from './film';
import { PlaylistModule } from './playlist';
import { TvSeriesModule } from './tv-series';
import { VideoModule } from './video';

@NgModule({
    exports: [
        FilmModule,
        TvSeriesModule,
        VideoModule,
        ClientModule,
        BookmarkModule,
        PlaylistModule
    ]
})
export class FeaturesModule {}
