import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadedFilmCardComponent, FilmCardComponent } from './components';

@NgModule({
    declarations: [
        FilmCardComponent,
        DownloadedFilmCardComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        FilmCardComponent,
        DownloadedFilmCardComponent
    ]
})
export class FilmModule {}
