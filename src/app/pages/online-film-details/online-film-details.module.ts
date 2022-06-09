import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import {
    DownloadButtonComponent,
    FavoriteButtonComponent,
    FilmDownloadProgressComponent
} from './components';
import { OnlineFilmDetailsComponent } from './online-film-details.component';
import { OnlineFilmDetailsRouting } from './online-film-details.routing';

@NgModule({
    declarations: [
        OnlineFilmDetailsComponent,
        DownloadButtonComponent,
        FavoriteButtonComponent,
        FilmDownloadProgressComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        OnlineFilmDetailsRouting
    ]
})
export class OnlineFilmDetailsModule {}
