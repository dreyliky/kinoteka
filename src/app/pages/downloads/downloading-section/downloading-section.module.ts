import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FilmCardModule } from '../film-card';
import { DownloadingFilmCardComponent } from './downloading-film-card';
import { DownloadingSectionComponent } from './downloading-section.component';
import { FilmDownloadCancelBottomSheetComponent } from './film-download-cancel-bottom-sheet';

@NgModule({
    declarations: [
        DownloadingSectionComponent,
        DownloadingFilmCardComponent,
        FilmDownloadCancelBottomSheetComponent
    ],
    imports: [
        SharedModule,
        FilmCardModule
    ],
    exports: [
        DownloadingSectionComponent
    ]
})
export class DownloadingSectionModule {}
