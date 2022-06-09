import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmDeleteBottomSheetComponent } from './components';
import { DownloadedFilmDetailsComponent } from './downloaded-film-details.component';
import { DownloadedFilmDetailsRouting } from './downloaded-film-details.routing';

@NgModule({
    declarations: [
        DownloadedFilmDetailsComponent,
        FilmDeleteBottomSheetComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        DownloadedFilmDetailsRouting
    ]
})
export class DownloadedFilmDetailsModule {}
