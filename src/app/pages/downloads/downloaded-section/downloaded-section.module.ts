import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FilmCardModule } from '../film-card';
import { DownloadedSectionComponent } from './downloaded-section.component';
import { FilmDeleteBottomSheetComponent } from './film-delete-bottom-sheet';
import { FilmDetailsWindowComponent } from './film-details-window';

@NgModule({
    declarations: [
        DownloadedSectionComponent,
        FilmDetailsWindowComponent,
        FilmDeleteBottomSheetComponent
    ],
    imports: [
        SharedModule,
        FilmCardModule
    ],
    exports: [
        DownloadedSectionComponent
    ]
})
export class DownloadedSectionModule {}
