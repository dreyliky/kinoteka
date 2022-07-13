import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { DownloadedFilmCardComponent } from './downloaded-film-card';
import { OnlineFilmCardComponent } from './online-film-card';

@NgModule({
    declarations: [
        OnlineFilmCardComponent,
        DownloadedFilmCardComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        OnlineFilmCardComponent,
        DownloadedFilmCardComponent
    ]
})
export class FilmsSharedModule {}
