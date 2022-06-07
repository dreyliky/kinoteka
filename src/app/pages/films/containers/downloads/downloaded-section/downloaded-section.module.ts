import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
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
        FeaturesModule
    ],
    exports: [
        DownloadedSectionComponent
    ]
})
export class DownloadedSectionModule {}
