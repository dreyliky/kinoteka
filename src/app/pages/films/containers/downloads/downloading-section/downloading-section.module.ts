import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
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
        FeaturesModule
    ],
    exports: [
        DownloadingSectionComponent
    ]
})
export class DownloadingSectionModule {}
