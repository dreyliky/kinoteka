import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { BookmarkButtonComponent, FilmDeleteBottomSheetComponent } from './components';
import { DownloadedFilmComponent } from './downloaded-film.component';
import { DownloadedFilmRouting } from './downloaded-film.routing';

@NgModule({
    declarations: [
        DownloadedFilmComponent,
        FilmDeleteBottomSheetComponent,
        BookmarkButtonComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        DownloadedFilmRouting
    ]
})
export class DownloadedFilmModule {}
